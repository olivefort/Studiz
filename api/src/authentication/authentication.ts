import { Document } from 'mongoose';

// Authentication model
export interface Authentication extends Document {
  readonly email: string;
  readonly password: string;
  readonly partner: string;
  readonly user: string;
}
