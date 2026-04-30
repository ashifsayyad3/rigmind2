import {
  WebSocketGateway, WebSocketServer, SubscribeMessage,
  OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { RtmService } from './rtm.service';

@WebSocketGateway({
  cors: { origin: process.env.CORS_ORIGINS?.split(',') ?? '*', credentials: true },
  namespace: '/rtm',
  transports: ['websocket', 'polling'],
})
export class RtmGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(RtmGateway.name);

  // Track which rigs each socket is subscribed to
  private subscriptions = new Map<string, Set<number>>();

  constructor(
    private jwtService: JwtService,
    private rtmService: RtmService,
    private eventEmitter: EventEmitter2,
  ) {}

  afterInit(server: Server) {
    this.logger.log('RTM WebSocket Gateway initialized');
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token ?? client.handshake.headers?.authorization?.split(' ')[1];
      if (!token) { client.disconnect(); return; }
      const payload = this.jwtService.verify(token);
      client.data.user = payload;
      this.subscriptions.set(client.id, new Set());
      this.logger.log(`Client connected: ${client.id} (user: ${payload.sub})`);

      // Send current fleet snapshot on connect
      const snapshot = await this.rtmService.getFleetSnapshot();
      client.emit('fleet:snapshot', snapshot);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.subscriptions.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('rig:subscribe')
  handleRigSubscribe(@MessageBody() data: { rigId: number }, @ConnectedSocket() client: Socket) {
    const subs = this.subscriptions.get(client.id) ?? new Set();
    subs.add(data.rigId);
    this.subscriptions.set(client.id, subs);
    client.join(`rig:${data.rigId}`);
    this.logger.debug(`${client.id} subscribed to rig ${data.rigId}`);

    // Send current rig RTM state immediately
    this.rtmService.getRigRtmState(data.rigId).then((state) => {
      client.emit('rig:state', state);
    });

    return { subscribed: true, rigId: data.rigId };
  }

  @SubscribeMessage('rig:unsubscribe')
  handleRigUnsubscribe(@MessageBody() data: { rigId: number }, @ConnectedSocket() client: Socket) {
    const subs = this.subscriptions.get(client.id);
    subs?.delete(data.rigId);
    client.leave(`rig:${data.rigId}`);
    return { unsubscribed: true, rigId: data.rigId };
  }

  // Broadcast real-time sensor reading to subscribed clients
  @OnEvent('rtm.sensor.reading')
  handleSensorReading(payload: { rigId: number; sensorTag: string; value: number; unit: string; timestamp: Date }) {
    this.server.to(`rig:${payload.rigId}`).emit('sensor:reading', payload);
  }

  // Broadcast new alarm to subscribed clients + all connected admins
  @OnEvent('rtm.alarm.triggered')
  handleAlarm(payload: { rigId: number; sensorId: string; value: number; threshold: number; alarmType: string }) {
    this.server.to(`rig:${payload.rigId}`).emit('alarm:triggered', payload);
    this.server.emit('fleet:alarm', payload); // broadcast to all for global alert panel
  }

  // Broadcast new failure created
  @OnEvent('failure.created')
  handleNewFailure(payload: { rigId: number; failure: any }) {
    this.server.to(`rig:${payload.rigId}`).emit('failure:new', payload.failure);
    this.server.emit('fleet:failure', payload.failure);
  }

  // Broadcast certificate expiry warning
  @OnEvent('certificate.expiring')
  handleCertExpiry(payload: { rigId: number; certificateId: number; daysUntilExpiry: number }) {
    this.server.to(`rig:${payload.rigId}`).emit('certificate:expiring', payload);
  }
}
