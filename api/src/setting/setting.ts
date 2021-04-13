import { Document } from 'mongoose';

/* Setting model */
export interface Setting extends Document{
  informations: {
    name: String,
    url: String,
    description: String,
  };
  position: {
    address: String,
    description: String,
  };
  contact: {
    email: String,
    phone: String,
  };
  schedule: {
    day: String,
    hour: String,
  };
}
