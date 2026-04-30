import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RtmService } from './rtm.service';
export declare class RtmGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private rtmService;
    private eventEmitter;
    server: Server;
    private readonly logger;
    private subscriptions;
    constructor(jwtService: JwtService, rtmService: RtmService, eventEmitter: EventEmitter2);
    afterInit(server: Server): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleRigSubscribe(data: {
        rigId: number;
    }, client: Socket): {
        subscribed: boolean;
        rigId: number;
    };
    handleRigUnsubscribe(data: {
        rigId: number;
    }, client: Socket): {
        unsubscribed: boolean;
        rigId: number;
    };
    handleSensorReading(payload: {
        rigId: number;
        sensorTag: string;
        value: number;
        unit: string;
        timestamp: Date;
    }): void;
    handleAlarm(payload: {
        rigId: number;
        sensorId: string;
        value: number;
        threshold: number;
        alarmType: string;
    }): void;
    handleNewFailure(payload: {
        rigId: number;
        failure: any;
    }): void;
    handleCertExpiry(payload: {
        rigId: number;
        certificateId: number;
        daysUntilExpiry: number;
    }): void;
}
