import { Document, Types } from 'mongoose';
import { Category } from 'src/category/category';

/* Article model */
export interface Article extends Document  {
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: Types.DocumentArray<Category>;
  readonly url: string;
}
