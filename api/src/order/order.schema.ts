import * as mongoose from 'mongoose';
import { userSchema } from 'src/user/user.schema';

/* Order scheme */
export const orderSchema = new mongoose.Schema({
  profile: String,
  articles:[
      { title: String, quantity: Number, price: Number },
  ],
  status:
  { value: String, updatedAt: Date },
  date: Date,
  user: [],
});
