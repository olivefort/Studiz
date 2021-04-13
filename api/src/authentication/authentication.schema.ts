import * as mongoose from 'mongoose';

// Authentication scheme
export const authenticationSchema = new mongoose.Schema({
  email: String,
  password: String,
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'partner' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});
