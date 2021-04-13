import { Injectable, NotFoundException, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order';
import { StatusUpdateDTO } from './status.dto.update';
import { Partner } from '../partner/partner';
import { User } from '../user/user';
import { OrderCreateDTO } from './order.dto.create';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class OrderService {

  constructor(@InjectModel('order') private readonly orderModel: Model<Order>,
              @InjectModel('partner') private readonly partnerModel: Model<Partner>,
              @InjectModel('user') private readonly userModel: Model<User>,
              ) {}

/**
 * Get all the orders from a partner
 * @param idPartner
 */
  async getAllOrders(idPartner: string): Promise<Order[]> {
    const partner = await this.partnerModel.findOne({ _id : idPartner }).exec();
    if (!partner) throw new NotFoundException();
    return partner.orders;
  }

/**
 * Get all the orders from a User
 * @param idUser
 */
  async getAllUserOrders(idUser: string): Promise<Order[]> {
    const user = await this.userModel.findOne({ _id : idUser }).exec();
    if (!user) throw new NotFoundException();
    return user.orders;
  }

  /**
   * Create orders from a Partner/User
   * @param idPartner
   * @param idUser
   * @param orderCreateDTO
   */
  async createUserOrder(idPartner: string,  idUser:string,
                        orderCreateDTO: OrderCreateDTO): Promise<Order> {
    const partner = await this.partnerModel.findById(idPartner);
    if (!partner) throw new NotFoundException();

    const user = await this.userModel.findById(idUser);
    if (!user) throw new NotFoundException();

    const order: Order = new this.orderModel(orderCreateDTO);

    partner.orders.push(order);
    await partner.save();

    user.orders.push(order);
    await user.save();

    return partner.orders[partner.orders.length - 1] && user.orders[user.orders.length - 1];
  }

  /**
   * Create orders from a partner
   * @param id , id of Partner
   * @param orderCreateDTO
   */
  async create(id: string, orderCreateDTO: OrderCreateDTO): Promise<Order> {
    const partner = await this.partnerModel.findById(id);

    if (!partner) throw new NotFoundException();
    const order: Order = new this.orderModel(orderCreateDTO);
    partner.orders.push(order);

    await partner.save();
    return partner.orders[partner.orders.length - 1];
  }

/**
 * Update an order for partner
 * @param idPartner
 * @param idOrder
 * @param orderUpdateDTO
 */
// tslint:disable-next-line: max-line-length
  async update(idPartner: string, idOrder: string, orderUpdateDTO: StatusUpdateDTO): Promise<Order> {
    const partner = await this.partnerModel.findOne({ _id : idPartner }).exec();
    if (!partner) throw new NotFoundException();
    const order = partner.orders.id(idOrder);
    if (!order) throw new NotFoundException();
    order.set('status', orderUpdateDTO);
    await partner.save();
    return order;
  }

  /**
   * Update an order for User
   * @param idPartner
   * @param idUser
   * @param idOrder
   * @param orderUpdateDTO
   */
  async updateUser(idPartner: string, idUser:string, idOrder: string,
                   orderUpdateDTO: StatusUpdateDTO): Promise<Order> {
    const partner = await this.partnerModel.findOne({ _id : idPartner }).exec();
    if (!partner) throw new NotFoundException();

    const user = await this.userModel.findOne({ _id: idUser }).exec();
    if (!user) throw new NotFoundException();

    const order = partner.orders.id(idOrder) && user.orders.id(idOrder);
    if (!order) throw new NotFoundException();
    order.set('status', orderUpdateDTO);

    await partner.save();
    await user.save();

    return order;
  }

/**
 * Delete an order for partner
 * @param idPartner
 * @param idOrder
 */
  async delete(idPartner: string, idOrder: string): Promise<Order> {
    const partner = await this.partnerModel.findById(idPartner);
    if (!partner) throw new NotFoundException();
    const order = partner.orders.remove(idOrder);
    if (!order) throw new NotFoundException();
    await partner.save();
    return partner.orders.id(idOrder);
  }
}
