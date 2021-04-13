import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partner } from '../partner/partner';
import { PartnerCreateDTO } from './partner.dto.create';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel('partner') private readonly partnerModel: Model<Partner>,
  ) { }

  /**
   * Recovery all partners
   */
  async getAll(): Promise<Partner[]> {
    return await this.partnerModel.find().exec();
  }

  /**
   * Create an partner
   * @param partnerDto , model to create Partner
   */
  create(partnerDto: PartnerCreateDTO): Promise<Partner> {
    const partner = new this.partnerModel(partnerDto);
    return partner.save();
  }
}
