import * as mongoose from 'mongoose';
import { articleSchema } from '../article/article.schema';
import { orderSchema } from '../order/order.schema';
import { categorySchema } from 'src/category/category.schema';

/* Partner scheme */
const nestedSetting = {
  informations: {
    name: String,
    url: String,
    description: String,
  },
  position: {
    address: String,
    description: String,
  },
  contact: {
    email: String,
    phone: String,
  },
  schedule: {
    day: String,
    hour: String,
  },
};

export const partnerSchema = new mongoose.Schema({
  id: String,
  setting: nestedSetting,
  orders: [orderSchema],
  articles: [articleSchema],
  category: [categorySchema],
});
