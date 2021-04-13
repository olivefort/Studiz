import { JwtService } from '@nestjs/jwt';
import {
  Injectable, CanActivate, ExecutionContext,
  BadRequestException, UnauthorizedException, Optional, NotFoundException, Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Guard for checking if authenticated user is allow to accessing route
 */
@Injectable()
export class AuthParamsIdGuard implements CanActivate {
  jwtUserParameterName: string;
  parameterName: string;
  /**
   * Constructor of AuthParamsIdGuard
   * Use JWT_USER_ID_PARAMETER_NAME environment variable to get user id in JWT
   * If no 'parameterName'is specified use GUARD_PARAMETER_NAME environment variable
   * @param jwtService JwtService to decode JWT from HTTP header
   * @param parameterName Name of route parameter
   */
  constructor(@Inject('JwtService') private jwtService: JwtService) {
    if (!process.env.GUARD_PARAMETER_NAME) {
      throw new Error('No parameter name specify');
    }
    this.parameterName = process.env.GUARD_PARAMETER_NAME;

    if (this.parameterName.startsWith(':')) {
      throw new Error('Parameter name cannot start with ":" ');
    }

    if (!process.env.JWT_USER_ID_PARAMETER_NAME) {
      throw new Error('No JWT_USER_ID_PARAMETER_NAME specify');
    }

    this.jwtUserParameterName = process.env.JWT_USER_ID_PARAMETER_NAME;

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get HTTP request
    const request = context.switchToHttp().getRequest();
    // Extract parameter from route
    const routeParam = request.params[this.parameterName];
    // Extract authorization from HTTP header
    const headers = request.headers.authorization;

    if (!routeParam) {
      throw new BadRequestException();
    }

    // Check if header exists
    if (!headers) {
      throw new UnauthorizedException();
    }

    // Split bearer and token
    const authorization = headers.split(' ');

    // Check authorization header
    if (authorization && authorization.length < 2 && authorization.length > 2) {
      throw new UnauthorizedException();
    }

    // Decode token parts of array
    const token = this.jwtService.decode(authorization[1], { json: true }) as any;

    // Check if route param match user authenticated id
    if (token[this.jwtUserParameterName] !== routeParam) {
      throw new NotFoundException();
    }

    return true;
  }
}
