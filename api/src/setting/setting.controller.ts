import { Controller, Put, Param, Body, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingUpdateDTO } from './setting.dto.update';
import { AuthGuard } from '@nestjs/passport';
import { AuthParamsIdGuard } from 'src/shared/guards/user.guard';
import { AuthToken, AuthTokenModel } from 'src/shared/decorators/auth-token.decorator';

@Controller('partners/:idPartner/setting')
export class SettingController {

  constructor(private readonly settingService: SettingService) {}

  /**
   * Road for update setting
   * @param id , id of Partner
   * @param settingUpdateDTO
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateSetting(@AuthToken() auth: AuthTokenModel, @Body() settingUpdateDTO: SettingUpdateDTO) {
    return await this.settingService.update(auth.user.toHexString(), settingUpdateDTO);
  }

  /**
   * Road for get setting
   * @param id ,id of Partner
   */
  @Get()
  async getSetting(@Param('idPartner') id: string) {
    return await this.settingService.getPartnersById(id);
  }
}
