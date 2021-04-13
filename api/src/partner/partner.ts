import { Document, Types } from 'mongoose';
import { Article } from 'src/article/article';
import { Order } from 'src/order/order';
import { Setting } from 'src/setting/setting';
import { Category } from 'src/category/category';

/* Partner model */
export interface Partner extends Document {
  readonly setting: Setting;
  readonly orders: Types.DocumentArray<Order>;
  readonly articles: Types.DocumentArray<Article>;
  readonly category: Types.DocumentArray<Category>;
}
