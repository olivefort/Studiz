
import { createParamDecorator } from '@nestjs/common';
import { ObjectID } from 'mongodb';

// tslint:disable-next-line: variable-name
export const AuthToken = createParamDecorator((data, req) => {
  return req.user;
});

export interface AuthTokenModel { 
  _id: string,
  email: string,
  user: ObjectID,
}
  