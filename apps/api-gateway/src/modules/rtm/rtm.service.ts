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

    const [latestSensors, activeAlarms, recentEvents] = await Promise.all([
      this.prisma.sensorReading.findMany({
        where: { rigId },
        orderBy: { timestamp: 'desc' },
        take: 20,
        distinct: ['sensorTag'],
      }),
      this.prisma.rtmAlarmConfiguration.findMany({
        where: { rigId, enabled: true },
      }),
      this.prisma.rtmEventData.findMany({
        where: { rtmRigId: rig?.rtmRigId ?? '' },
        orderBy: { timestamp: 'desc' },
        take: 10,
      }),
    ]);

    return { rig, latestSensors, activeAlarms, recentEvents, updatedAt: new Date() };
  }

  async getSensorHistory(rigId: number, sensorTag: string, hours = 24) {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.prisma.sensorReading.findMany({
      where: { rigId, sensorTag, timestamp: { gte: since } },
      orderBy: { timestamp: 'asc' },
    });
  }

  async getAlarmHistory(rigId: number, take = 50) {
    const rig = await this.prisma.rig.findUnique({ where: { id: rigId }, select: { rtmRigId: true } });
    return this.prisma.rtmEventDataHistory.findMany({
      where: { rtmRigId: rig?.rtmRigId ?? '' },
      orderBy: { timestamp: 'desc' },
      take,
    });
  }

  async checkAndBroadcastAlarms(rigId: number) {
    const configs = await this.prisma.rtmAlarmConfiguration.findMany({
      where: { rigId, enabled: true },
    });
    const rig = await this.prisma.rig.findUnique({ where: { id: rigId }, select: { rtmRigId: true } });

    for (const config of configs) {
      const latest = await this.prisma.rtmEventData.findFirst({
        where: { rtmRigId: rig?.rtmRigId ?? '', sensorId: config.sensorId ?? '' },
        orderBy: { timestamp: 'desc' },
      });
      if (latest && config.threshold != null && latest.value != null && latest.value > config.threshold) {
        this.eventEmitter.emit('rtm.alarm.triggered', {
          rigId,
          sensorId: config.sensorId,
          value: latest.value,
          threshold: config.threshold,
          alarmType: config.alarmType,
        });
      }
    }
  }
}
