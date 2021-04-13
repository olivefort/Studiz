import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('notification')
export class NotificationController {

  constructor(
    private service: NotificationService,
  ) { }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('partner')
  // async  createPartnerNotification(@user() user, @Param('idPartner') idPartner: string,
  //                                  @Body() body: any) {
  //   this.service.addPartnerPushSubscriber({ subscription: body.subscription,
  //     id: user.partner.toString() });
  // }

  @Post('client')
  async  sendNotificationToClient(@Body() body: any) {
    this.service.addClientPushSubscriber({ subscription: body.subscription });
  }
}
