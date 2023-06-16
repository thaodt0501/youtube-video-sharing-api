import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('events')
  // notifyVideoCreated(@MessageBody() data: any) {
  //   this.server.emit("videoCreated", data);
  //   console.log(`data`, data);
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'videoCreated', data: item })));
  // }

  notifyVideoCreated(video: any) {
    console.log(`data`, video);
    this.server.emit('videoCreated', video);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}