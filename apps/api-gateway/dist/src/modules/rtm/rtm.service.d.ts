import { PrismaService } from '../../prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class RtmService {
    private prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    getFleetSnapshot(): Promise<{
        rigs: {
            rig: {
                id: number;
                name: string;
                status: string | null;
                rtmRigId: string | null;
            } | null;
            latestSensors: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                rigId: number | null;
                startDate: Date | null;
                endDate: Date | null;
                observationId: number | null;
                sensorTag: string | null;
                timestamp: Date | null;
                value: number | null;
            }[];
            activeAlarms: {
                id: number;
                enabled: boolean;
                createdAt: Date;
                updatedAt: Date;
                rigId: number | null;
                sensorId: string | null;
                parameterName: string | null;
                alarmType: string | null;
                alarmName: string | null;
                timeThresholdType: string | null;
                timeThresholdValue: number | null;
                threshold: number | null;
                lowerBound_W: number | null;
                lowerBound_C: number | null;
                upperBound_W: number | null;
                upperBound_C: number | null;
            }[];
            recentEvents: {
                id: number;
                createdAt: Date;
                rigId: number | null;
                status: string | null;
                rtmRigId: string | null;
                startTime: Date | null;
                endTime: Date | null;
                priority: string | null;
                eventName: string | null;
                eventId: string | null;
                timestamp: Date | null;
                value: number | null;
                sensorId: string | null;
                parameterName: string | null;
                alarmType: string | null;
                isAcknowledge: boolean;
            }[];
            updatedAt: Date;
        }[];
        timestamp: Date;
    }>;
    getRigRtmState(rigId: number): Promise<{
        rig: {
            id: number;
            name: string;
            status: string | null;
            rtmRigId: string | null;
        } | null;
        latestSensors: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            startDate: Date | null;
            endDate: Date | null;
            observationId: number | null;
            sensorTag: string | null;
            timestamp: Date | null;
            value: number | null;
        }[];
        activeAlarms: {
            id: number;
            enabled: boolean;
            createdAt: Date;
            updatedAt: Date;
            rigId: number | null;
            sensorId: string | null;
            parameterName: string | null;
            alarmType: string | null;
            alarmName: string | null;
            timeThresholdType: string | null;
            timeThresholdValue: number | null;
            threshold: number | null;
            lowerBound_W: number | null;
            lowerBound_C: number | null;
            upperBound_W: number | null;
            upperBound_C: number | null;
        }[];
        recentEvents: {
            id: number;
            createdAt: Date;
            rigId: number | null;
            status: string | null;
            rtmRigId: string | null;
            startTime: Date | null;
            endTime: Date | null;
            priority: string | null;
            eventName: string | null;
            eventId: string | null;
            timestamp: Date | null;
            value: number | null;
            sensorId: string | null;
            parameterName: string | null;
            alarmType: string | null;
            isAcknowledge: boolean;
        }[];
        updatedAt: Date;
    }>;
    getSensorHistory(rigId: number, sensorTag: string, hours?: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        rigId: number | null;
        startDate: Date | null;
        endDate: Date | null;
        observationId: number | null;
        sensorTag: string | null;
        timestamp: Date | null;
        value: number | null;
    }[]>;
    getAlarmHistory(rigId: number, take?: number): Promise<{
        id: number;
        createdAt: Date;
        rigId: number | null;
        status: string | null;
        rtmRigId: string | null;
        startTime: Date | null;
        endTime: Date | null;
        priority: string | null;
        eventName: string | null;
        eventId: string | null;
        timestamp: Date | null;
        parameterName: string | null;
        alarmType: string | null;
        isAcknowledge: boolean;
    }[]>;
    checkAndBroadcastAlarms(rigId: number): Promise<void>;
}
