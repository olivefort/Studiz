// tslint:disable-next-line: max-line-length
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Client } from 'socket.io';
import { RoomService } from './room.service';

@WebSocketGateway()
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(public roomservice: RoomService) {}

  @WebSocketServer()
  server: Server;

  public users: number = 0;
  public idPartner: string;
  public idOrder: string;
  public client: Client;

  async handleConnection() {
    // tslint:disable-next-line: no-increment-decrement
    this.users++;
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    // tslint:disable-next-line: no-increment-decrement
    this.users--;
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('join')
  async onRoomJoin(client: Client, idPartner: string): Promise<any> {
    this.roomservice.addPartner(idPartner, client);
  }

  @SubscribeMessage('join2')
  async onRoomJoin2(client: Client, data: any): Promise<any> {
    this.roomservice.addClient(data.idOrder, data.idPartner, client);
  }

}
