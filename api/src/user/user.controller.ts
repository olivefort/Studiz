import { Controller, Post, Body, Get, Put, HttpCode,
  HttpStatus, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDTO } from './user.dto.create';
import { User } from './user';
import { AuthGuard } from '@nestjs/passport';
import { UserUpdateDTO } from './user.dto.update';
import { AuthParamsIdGuard } from '../shared/guards/user.guard';
import { AuthToken, AuthTokenModel } from '../shared/decorators/auth-token.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Road for get all user
   */
  @Get()
  async readAll() {
    return await this.userService.getAll();
  }

  /**
   * Road for get all user by ID
   * @param id , id of User
   */
  @Get(':idUser')
  async getSetting(@Param('idUser') id: string) {
    return await this.userService.getUserById(id);
  }

  /**
   * Create user
   * @param user , model for create user
   */
  @Post()
  async create(@Body() user: UserCreateDTO): Promise<User> {
    return await this.userService.create();
  }
  /**
   * Update user
   * @param idUser
   * @param userUpdateDTO
   */
  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async updateArticle(@AuthToken() auth: AuthTokenModel,
                      @Body() userUpdateDTO: UserUpdateDTO) {
    return await this.userService.update(auth.user.toHexString(), userUpdateDTO);
  }
}
