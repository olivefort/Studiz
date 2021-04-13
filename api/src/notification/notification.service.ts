import { Injectable } from '@nestjs/common';
import * as  webpush from 'web-push';

@Injectable()
export class NotificationService {
  CLIENT_SUBSCRIPTIONS: any[] = [];
  PARTNER_SUBSCRIPTIONS: any[] = [];

  constructor() {
    const vapidKeys = {
      // tslint:disable-next-line: max-line-length
      publicKey: 'BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo',
      privateKey: 'PkVHOUKgY29NM7myQXXoGbp_bH_9j-cxW5cO-fGcSsA',
    };

    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      vapidKeys.publicKey,
      vapidKeys.privateKey,
    );
  }

  public addClientPushSubscriber(body) {
    this.CLIENT_SUBSCRIPTIONS.push(body);
  }

  public addPartnerPushSubscriber(body) {
    this.PARTNER_SUBSCRIPTIONS.push(body);
  }

  public async sendNotificationToClient(idClient, body): Promise<any> {

    const notificationPayload = {
      notification: {
        title: 'Changement de status de la commande',
        // tslint:disable-next-line: object-shorthand-properties-first
        body,
        icon: '',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        actions: [{
          action: 'http://localhost:8080/orders',
          title: 'Aller a la commande',
        }],
      },
    };
    const clientSubject = this.CLIENT_SUBSCRIPTIONS.find(c => c.id === idClient);
    return webpush.sendNotification(clientSubject.subscription,
                                    JSON.stringify(notificationPayload));
  }

  public async sendNotificationToPartner(idPartner, body): Promise<any> {

    const notificationPayload = {
      notification: {
        title: 'Nouvelle Commande',
        // tslint:disable-next-line: object-shorthand-properties-first
        body,
        icon: '',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        actions: [{
          action: 'http://localhost:8081/orders',
          title: 'Aller au Commandes',
        }],
      },
    };
    const partnerSubject = this.PARTNER_SUBSCRIPTIONS.find(p => p.id === idPartner);
    return webpush.sendNotification(partnerSubject.subscription,
                                    JSON.stringify(notificationPayload));
  }
}
