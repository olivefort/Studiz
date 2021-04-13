import * as mongoose from 'mongoose';
import { orderSchema } from '../order/order.schema';

/* User scheme */
export const userSchema = new mongoose.Schema({
  informations: {
    name: String,
    lastname: String,
  },
  position: {
    address: String,
  },
  contact: {
    email: String,
    phone: String,
  },
  orders: [orderSchema],
});
