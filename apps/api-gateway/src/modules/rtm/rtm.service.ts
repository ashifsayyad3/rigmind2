import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class RtmService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async getFleetSnapshot() {
    const rigs = await this.prisma.rig.findMany({
      where: { visible: true, isRTM: true },
      select: { id: true, name: true, rtmRigId: true, status: true },
    });

    const snapshots = await Promise.all(rigs.map((r: { id: number }) => this.getRigRtmState(r.id)));
    return { rigs: snapshots, timestamp: new Date() };
  }

  async getRigRtmState(rigId: number) {
    const rig = await this.prisma.rig.findUnique({
      where: { id: rigId },
      select: { id: true, name: true, rtmRigId: true, status: true },
    });

    const [activeAlarms, recentEvents] = await Promise.all([
      this.prisma.rtmAlarmConfiguration.findMany({
        where: { rigId, status: true },
      }),
      this.prisma.rtmEventData.findMany({
        where: { rigId },
        orderBy: { startTime: 'desc' },
        take: 10,
      }),
    ]);

    return { rig, activeAlarms, recentEvents, updatedAt: new Date() };
  }

  async getSensorHistory(rigId: number, sensorTag: string, hours = 24) {
    // SensorReading does not have rigId/sensorTag/timestamp fields
    // Return event data filtered by rig and parameter name instead
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.prisma.rtmEventData.findMany({
      where: { rigId, parameterName: sensorTag, startTime: { gte: since } },
      orderBy: { startTime: 'asc' },
    });
  }

  async getAlarmHistory(rigId: number, take = 50) {
    return this.prisma.rtmEventDataHistory.findMany({
      where: { rigId },
      orderBy: { startTime: 'desc' },
      take,
    });
  }

  async checkAndBroadcastAlarms(rigId: number) {
    const configs = await this.prisma.rtmAlarmConfiguration.findMany({
      where: { rigId, status: true },
    });

    for (const config of configs) {
      const latest = await this.prisma.rtmEventData.findFirst({
        where: { rigId, parameterName: config.parameterName ?? undefined },
        orderBy: { startTime: 'desc' },
      });
      if (latest) {
        this.eventEmitter.emit('rtm.alarm.triggered', {
          rigId,
          parameterName: config.parameterName,
          alarmType: config.alarmType,
          alarmName: config.alarmName,
          event: latest,
        });
      }
    }
  }
}
