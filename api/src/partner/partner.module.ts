import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { partnerSchema } from './partner.schema';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    /* Import of the Mongoose module */
    MongooseModule.forFeature([{ name: 'partner', schema: partnerSchema }]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports:[PartnerService, MongooseModule],

})
export class PartnerModule { }
