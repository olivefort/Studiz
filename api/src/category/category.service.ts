import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryCreateDTO } from './category.dto.create';
import { CategoryUpdateDTO } from './category.dto.update';
import { Category } from './category';
import { Partner } from '../partner/partner';
import { ObjectID } from 'mongodb';

@Injectable()
export class CategoryService {

  constructor(
    @InjectModel('category') private readonly categoryModel: Model<Category>,
    @InjectModel('partner') private readonly partnerModel: Model<Partner>,
  ) { }

  /**
   * Get categories
   * @param idPartner
   */
  async getCategories(idPartner: string): Promise<Category[]> {
    const partner = await this.partnerModel.findOne({ _id: new ObjectID(idPartner) }).exec();
    return partner.category;
  }

    /**
     * Get categories by id
     * @param idPartner
     * @param idCategory
     */
  async getById(idPartner: string, idCategory: string): Promise<Category> {
    const partner = await this.partnerModel.findById(idPartner)
        .exec();
    if (!partner) throw new NotFoundException();
    const category = partner.category.id(idCategory);
    if (!category) throw new NotFoundException();
    return category;
  }

  /**
   * Create categories
   * @param idPartner
   * @param categoryCreateDTO
   */
  async create(idPartner: string, categoryCreateDTO: CategoryCreateDTO): Promise<Category> {
    const partner = await this.partnerModel.findById(idPartner);
    if (!partner) throw new NotFoundException();

    const category: Category = new this.categoryModel(categoryCreateDTO);
    partner.category.push(category);

    await partner.save();
    return partner.category[partner.category.length - 1];
  }

  /**
   * Update category
   * @param idPartner
   * @param idCategory
   * @param categoryUpdateDTO
   */
  async update(idPartner: string, idCategory: string,
               categoryUpdateDTO: CategoryUpdateDTO): Promise<Category> {
    const partner = await this.partnerModel.findOne({ _id: idPartner }).exec();
    if (!partner) throw new NotFoundException();
    const category = partner.category.id(idCategory);
    if (!category) throw new NotFoundException();
    category.set(categoryUpdateDTO);
    await partner.save();
    return category;
  }

  /**
   * Delete Category
   * @param idPartner
   * @param idCategory
   */
  async delete(idPartner: string, idCategory: string): Promise<Category> {
    const partner = await this.partnerModel.findById(idPartner);
    if (!partner) {
      throw new NotFoundException();
    }
    const category = partner.category.remove(idCategory);
    if (!category) throw new NotFoundException();
    await partner.save();
    return partner.category.id(idCategory);
  }
}
