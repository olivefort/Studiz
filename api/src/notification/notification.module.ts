
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { PartnerModule } from '../partner/partner.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    AuthenticationModule,
    PartnerModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
