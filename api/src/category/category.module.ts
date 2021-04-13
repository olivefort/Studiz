import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerModule } from 'src/partner/partner.module';
import { UserModule } from 'src/user/user.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { categorySchema } from './category.schema';

@Module({
  imports: [
    UserModule,
    PartnerModule,
    MongooseModule.forFeature([{ name: 'category', schema: categorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService, MongooseModule],
})
export class CategoryModule {}
