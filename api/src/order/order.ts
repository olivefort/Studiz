import { Document, Types } from 'mongoose';
import { User } from 'src/user/user';

/* Order model */
export interface Order extends Document {
  readonly profile: string;
  readonly articles: [{
    readonly title: string,
    readonly quantity: number,
    readonly price: number,
  }];
  readonly status: {
    readonly value: string,
    readonly updatedAt: Date,
  };
  readonly date: Date;
  readonly user: Types.DocumentArray<User>;
}
