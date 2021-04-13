import { Injectable } from '@nestjs/common';
import { Client } from 'socket.io';

@Injectable()
export class RoomService {

  clients: {idOrder: string, idPartner: string, client: Client}[] = [];
  partners: {idPartner: string, client: Client}[] = [];

  addClient(idOrder: string, idPartner: string , client: Client) {
    this.clients.push({ idOrder, idPartner, client });
  }

  addPartner(idPartner: string, client: Client) {
    this.partners.push({ idPartner, client });
  }

}
