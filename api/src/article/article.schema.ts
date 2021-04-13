import * as mongoose from 'mongoose';
import { categorySchema } from 'src/category/category.schema';

/* Article scheme */
export const articleSchema = new mongoose.Schema({
  title: String,
  price: Number,
  quantity: Number,
  description: String,
  category: [categorySchema],
  url: String,
});
