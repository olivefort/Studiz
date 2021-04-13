import { Document, Types } from 'mongoose';
import { Order } from 'src/order/order';

/* user model */
export interface User extends Document {
  informations: {
    name: String,
    lastname: String,
  };
  position: {
    address: String,
  };
  contact: {
    email: String,
    phone: String,
  };

  readonly orders: Types.DocumentArray<Order>;
}
