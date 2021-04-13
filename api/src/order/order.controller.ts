// tslint:disable-next-line: max-line-length
import {
  Controller,
  HttpStatus,
  HttpCode,
  Get,
  Put,
  Param,
  Body,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { StatusUpdateDTO } from './status.dto.update';
import { OrderCreateDTO } from './order.dto.create';
import { AuthGuard } from '@nestjs/passport';
import { AuthParamsIdGuard } from '../shared/guards/user.guard';
import { NotificationService } from '../notification/notification.service';

@Controller()
export class OrderController {
  // tslint:disable-next-line: max-line-length
  constructor(
    private readonly orderService: OrderService,
    private readonly service: NotificationService,
  ) {}

  /**
   *  Road who get all the orders from partner/user
   * @param idPartner
   */
  @Get('partners/:idPartner/orders')
  async getAllOrders(@Param('idPartner') idPartner: string) {
    return await this.orderService.getAllOrders(idPartner);
  }
  @Get('user/:idUser/orders')
  async getAllUserOrders(@Param('idUser') idUser: string) {
    return await this.orderService.getAllUserOrders(idUser);
  }

  /**
   * Road who create an order for partner/user
   * @param idPartner
   * @param idUser
   * @param orderCreateDTO
   */
  @Post('partners/:idPartner/orders/user/:idUser')
  @HttpCode(HttpStatus.CREATED)
  async createuserOrder(
    @Param('idPartner') idPartner: string,
    @Param('idUser') idUser: string,
    @Body() orderCreateDTO: OrderCreateDTO,
  ) {
    const order = await this.orderService.createUserOrder(
      idPartner,
      idUser,
      orderCreateDTO,
    );
    try {
      this.service.sendNotificationToPartner(idPartner, 'hello boy');
    } finally {
      return order;
    }
  }

  /**
   * Road who create an order for partner without User
   * @param idPartner
   * @param orderCreateDTO
   */
  @Post('partners/:idPartner/orders')
  @HttpCode(HttpStatus.CREATED)
  // tslint:disable-next-line: max-line-length
  async createOrder(
    @Param('idPartner') idPartner: string,
    @Body() orderCreateDTO: OrderCreateDTO,
  ) {
    const order = await this.orderService.create(idPartner, orderCreateDTO);
    try {
      this.service.sendNotificationToPartner(idPartner, 'hello boy');
    } finally {
      return order;
    }
  }

  /**
   * Road for update an order for partner/user
   * @param idPartner
   * @param idUser
   * @param idOrder
   * @param orderUpdateDTO
   */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Put('partners/:idPartner/orders/:idOrder/user/:idUser')
  // tslint:disable-next-line: max-line-length
  async updateUserOrder(
    @Param('idPartner') idPartner: string,
    @Param('idUser') idUser: string,
    @Param('idOrder') idOrder: string,
    @Body() orderUpdateDTO: StatusUpdateDTO,
  ) {
    return await this.orderService.updateUser(
      idPartner,
      idUser,
      idOrder,
      orderUpdateDTO,
    );
  }

  /**
   * Road for update an order for partner
   * @param idPartner
   * @param idOrder
   * @param orderUpdateDTO
   */
  @UseGuards(AuthGuard('jwt'), AuthParamsIdGuard)
  @HttpCode(HttpStatus.OK)
  @Put('partners/:idPartner/orders/:idOrder')
  // tslint:disable-next-line: max-line-length
  async updateOrder(
    @Param('idPartner') idPartner: string,
    @Param('idOrder') idOrder: string,
    @Body() orderUpdateDTO: StatusUpdateDTO,
  ) {
    return await this.orderService.update(idPartner, idOrder, orderUpdateDTO);
  }

  /**
   * Road for delete an order for partner
   * @param idPartner
   * @param idOrder
   */
  @UseGuards(AuthGuard('jwt'), AuthParamsIdGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/partners/:idPartner/orders/:idOrder')
  async removeOrder(
    @Param('idPartner') idPartner: string,
    @Param('idOrder') idOrder: string,
  ) {
    await this.orderService.delete(idPartner, idOrder);
  }
}
