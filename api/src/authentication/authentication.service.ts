import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Authentication } from './authentication';
import {
  AuthenticationPartnerCreateDTO,
  AuthenticationClientCreateDTO,
} from './authentication.dto.create';
import { AuthenticationUpdateDTO } from './authentication.dto.update';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.model';

@Injectable()
export class AuthenticationService {

  constructor(@InjectModel('authentication')
  private readonly authenticationModel: Model<Authentication>,
              private readonly jwtService: JwtService) { }

/**
 * Recovery of all partners in database
 */
  async getPartners(): Promise<Authentication[]> {
    return await this.authenticationModel.find({}).exec();
  }

/**
 * Recovering a partner in the database
 * @param id , id of Authentification
 */
  async getPartnersById(id): Promise<Authentication> {
    return await this.authenticationModel.findById({ _id: new ObjectId(id) });
  }

/**
 * Recovery of the user, verification of its existence in database.
If the user exists then we create it in database otherwise we return an error.
 * @param authenticationCreateDto
 */
  async create(authenticationCreateDto: AuthenticationPartnerCreateDTO |
    AuthenticationClientCreateDTO): Promise<Authentication> {
    const user = await this.authenticationModel.findOne({ email: authenticationCreateDto.email });
    if (user) {
      throw new UnauthorizedException();
    }
    const model: Authentication = new this.authenticationModel(authenticationCreateDto);
    return await model.save();
  }

/**
 * recovery of an email in database
 * @param email
 */
  async findByEmail(email: string): Promise<Authentication> {
    return await this.authenticationModel.findOne({ email });
  }

/**
 * Retrieving partner information by ID.
Once the recovery is done, we can modify its authentication information (email, ...)
 * @param id , id of Authentification
 * @param authenticationUpdateDTO
 */
  async update(id: string, authenticationUpdateDTO: AuthenticationUpdateDTO) {
    const authentication = await this.authenticationModel
      .findByIdAndUpdate(id, authenticationUpdateDTO, {
        new: true,
      });
    if (!authentication) {
      throw new NotFoundException();
    }
    return authentication;
  }

/**
 * Retrieving partner information by ID.
Once the recovery is done, we can delete its authentication information
 * @param id, id of Authentification
 */
  async delete(id: string): Promise<Authentication> {
    const authentication = await this.authenticationModel.findByIdAndDelete(id);
    if (!authentication) {
      throw new NotFoundException();
    }
    return authentication;
  }

/**
 * Service that will allow the connection of the partner to his application.
We create a token by incorporating in it, via the JwtPayload, the email and
the identifier of the user.
 * @param email
 * @param id , id of Authentification
 */
  async signIn(email: string, id: string): Promise<any> {
    const partner: JwtPayload = { email, user: id };
    const token = { token: this.jwtService.sign(partner) };
    return token;
  }

/**
 * Service allowing the validation of the emails via the JwtPayload
 * @param payload
 */
  async validateEmail(payload: JwtPayload): Promise<any> {
    return await this.authenticationModel.findOne({ email: payload.email });
  }

/**
 * Service allowing the validation of the password via the comparison
between what is entered in the input and what is in the database for Partner
 * @param partner
 */
  async validatePassword(partner: AuthenticationPartnerCreateDTO): Promise<any> {
    const userFinding = await this.authenticationModel.findOne({ email: partner.email });
    if (userFinding.password !== partner.password) {
      throw new UnauthorizedException();
    } else {
      return userFinding;
    }
  }

/**
 * Service allowing the validation of the password via the comparison
between what is entered in the input and what is in the database for User
 * @param user
 */
  async validateClientPassword(user: AuthenticationClientCreateDTO): Promise<any> {
    const userFinding = await this.authenticationModel.findOne({ email: user.email });
    if (userFinding.password !== user.password) {
      throw new UnauthorizedException();
    } else {
      return userFinding;
    }
  }

}
