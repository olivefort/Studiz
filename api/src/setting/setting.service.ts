import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partner } from 'src/partner/partner';
import { SettingUpdateDTO } from './setting.dto.update';
import { ObjectId } from 'mongodb';
import { Setting } from './setting';

@Injectable()
export class SettingService {

  constructor(
    @InjectModel('partner') private readonly partnerModel: Model<Partner>,
  ) {}

  /**
   * Update setting for partner
   * @param id , id of Partner
   * @param settingUpdateDTO
   */
  async update(id: string, settingUpdateDTO: SettingUpdateDTO): Promise<Setting> {
    const partner = await this.partnerModel.findByIdAndUpdate(id, { setting: settingUpdateDTO })
    .exec();

    if (!partner) throw new NotFoundException();
    return partner.setting;
  }

  /**
   * Get setting for partner by id
   * @param id , id of setting
   */
  async getPartnersById(id): Promise<Setting> {
    const partner = await this.partnerModel.findById({ _id: new ObjectId(id) });

    if (!partner) throw new NotFoundException();

    return partner.setting;
  }
}
