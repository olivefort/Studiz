import { Module } from '@nestjs/common';
import { PartnerModule } from '../partner/partner.module';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PartnerModule,
    PassportModule,
  ],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
