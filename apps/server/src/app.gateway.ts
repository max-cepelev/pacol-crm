import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { TaskStatusesService } from './modules/task-statuses/task-statuses.service';
import { TasksService } from './modules/tasks/tasks.service';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private tasksService: TasksService,
    private taskStatusesService: TaskStatusesService,
  ) {}

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('tasks:update')
  async tasksMessage(
    client: Socket,
    payload: Prisma.TaskUncheckedCreateInput[],
  ) {
    await this.tasksService.updateMany(payload);
    const tasks = await this.taskStatusesService.findAll({});
    this.server.emit('tasks', tasks);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    const { userId, distributorId } = client.handshake.query;
    console.log({ userId, distributorId });
    const tasks = await this.taskStatusesService.findAll({ userId: +userId });
    this.server.emit('tasks', tasks);
  }
}
