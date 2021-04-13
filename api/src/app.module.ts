import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerModule } from './partner/partner.module';
import { OrderModule } from './order/order.module';
import { SettingModule } from './setting/setting.module';
import { ArticleModule } from './article/article.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { NotificationModule } from './notification/notification.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule
    .forRoot(process.env.MONGO_URI, { useNewUrlParser: true }),
    PartnerModule,
    UserModule,
    OrderModule,
    SettingModule,
    ArticleModule,
    CategoryModule,
    NotificationModule,
    RoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
