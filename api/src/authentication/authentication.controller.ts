// tslint:disable-next-line: max-line-length
import { Controller, HttpCode, HttpStatus, Param, Post, Put, Delete, Body, UseGuards, HttpException, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  AuthenticationPartnerCreateDTO,
  AuthenticationClientCreateDTO,
} from './authentication.dto.create';
import { AuthenticationUpdateDTO } from './authentication.dto.update';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('authentication')
export class AuthenticationController {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) { }

  /**
   * Signup road for partner
   * @param authenticationCreateDTO
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Post('/partner/signup')
  async createPartner(@Body() authenticationCreateDTO: AuthenticationPartnerCreateDTO) {
    await this.authenticationService.create(authenticationCreateDTO);
  }

  /**
   * Signup road for Partner
   * @param authenticationCreateDTO
   */
  @HttpCode(HttpStatus.OK)
  @Post('/client/signup')
  async createClient(@Body() authenticationCreateDTO: AuthenticationClientCreateDTO) {
    const userFinded = await this.authenticationService.findByEmail(authenticationCreateDTO.email);
    if (userFinded) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.create();
    const userid: AuthenticationClientCreateDTO = {
      ...authenticationCreateDTO,
      user: user._id,
    };
    await this.authenticationService.create(userid);
  }

  /**
   * Update informations road side authentication
   * @param id , id of Authentification
   * @param authenticationUpdateDTO
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() authenticationUpdateDTO: AuthenticationUpdateDTO) {
    return await this.authenticationService.update(id, authenticationUpdateDTO);
  }

  /**
   * Delete informations road side authentication
   * @param id , id of Authentification
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.authenticationService.delete(id);
    return;
  }

  /**
   * Signin road
   * @param authenticationCreateDTO
   */
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() authenticationCreateDTO: AuthenticationPartnerCreateDTO) {
    const userFinding = await this.authenticationService.validatePassword(authenticationCreateDTO);
    return this.authenticationService.signIn(userFinding.email, userFinding.partner);
  }

 /**
  * Signup road for User
  * @param authenticationclientCreateDTO
  */
  @HttpCode(HttpStatus.OK)
  @Post('client/signin')
  async clientSignin(@Body() authenticationclientCreateDTO: AuthenticationClientCreateDTO) {
    // tslint:disable-next-line: max-line-length
    const userFinding = await this.authenticationService.validateClientPassword(authenticationclientCreateDTO);
    return this.authenticationService.signIn(userFinding.email, userFinding.user);
  }
}
