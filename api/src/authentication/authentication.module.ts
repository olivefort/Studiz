import { authenticationSchema } from './authentication.schema';
import { Module, Global } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { partnerSchema } from '../partner/partner.schema';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    // Import of the Mongoose module
    MongooseModule.forFeature([{ name: 'authentication', schema: authenticationSchema }]),
    MongooseModule.forFeature([{ name: 'partner', schema: partnerSchema }]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy,
    /* {
      provide: APP_GUARD,
      useClass: AuthParamsIdGuard,
    }, */
  ],
  exports: [PassportModule, AuthenticationService, JwtModule],
})
export class AuthenticationModule {}
