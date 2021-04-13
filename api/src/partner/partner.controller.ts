import { Controller, Post, Body, Get } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerCreateDTO } from './partner.dto.create';
import { Partner } from './partner';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) { }

  /**
   * Recovery all partners
   */
  @Get()
  async readAll() {
    return await this.partnerService.getAll();
  }

  /**
   * Create an partner
   * @param partner , model to create Partner
   */
  @Post()
  create(@Body() partner: PartnerCreateDTO): Promise<Partner> {
    return this.partnerService.create(partner);
  }
}
