import { articleSchema } from './article.schema';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerModule } from '../partner/partner.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    AuthenticationModule,
    PartnerModule,
    /* Import of the Mongoose module */
    MongooseModule.forFeature([{ name: 'article', schema: articleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService, MongooseModule],
})
export class ArticleModule {}
