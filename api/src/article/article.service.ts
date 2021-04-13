import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleCreateDTO } from './article.dto.create';
import { ArticleUpdateDTO } from './article.dto.update';
import { Article } from './article';
import { Partner } from '../partner/partner';
import { ObjectID } from 'mongodb';
import { ArticleSearchDTO } from './article.dto.search';
import { Category } from '../category/category';

@Injectable()
export class ArticleService {

  constructor(
    @InjectModel('article') private readonly articleModel: Model<Article>,
    @InjectModel('partner') private readonly partnerModel: Model<Partner>,
  ) { }

  /**
   * Get all the articles from a partner
   * @param idPartner
   */
  async getAll(idPartner: string): Promise<Article[]> {
    const partner = await this.partnerModel.findOne({ _id: new ObjectID(idPartner) }).exec();
    return partner.articles;
  }

  /**
   * Get one article from a partner
   * @param idPartner
   * @param idArticle
   */
  async getById(idPartner: string, idArticle: string): Promise<Article> {
    const partner = await this.partnerModel.findById(idPartner)
      .exec();
    if (!partner) throw new NotFoundException();
    const article = partner.articles.id(idArticle);
    if (!article) throw new NotFoundException();
    return article;
  }

  /**
   * Search articles from a partner
   * @param idPartner
   * @param articleSearchDTO
   */
  async search(idPartner: string, articleSearchDTO: ArticleSearchDTO): Promise<Article[]> {
    const pipe: any[] = [
      { $match: { _id: new ObjectID(idPartner) } },
      { $unwind: '$articles' },
    ];

    if (articleSearchDTO.category) {
      pipe.push(
        {
          $match: {
            'articles.category.category':
              { $regex: `.*${articleSearchDTO.category}.*`, $options: 'i' },
          },
        },
      );
    }

    if (articleSearchDTO.title) {
      pipe.push(
        {
          $match: {
            'articles.title':
              { $regex: `.*${articleSearchDTO.title}.*`, $options: 'i' },
          },
        },
      );
    }

    pipe.push(
      { $replaceRoot: { newRoot: '$articles' } },
    );

    return this.partnerModel.aggregate(pipe).exec();
  }

  /**
   * Search articles by categories from a partner
   * @param idPartner
   */
  async getCategories(idPartner: string): Promise<string[]> {
    return this.partnerModel.findById(idPartner).distinct('articles.category');
  }

  /**
   * Search articles by titles from a partner
   * @param idPartner
   */
  async getTitles(idPartner: string): Promise<string[]> {
    return this.partnerModel.findById(idPartner).distinct('articles.title');
  }

  /**
   * Create an article for partner
   * @param idPartner
   * @param articleCreateDTO
   */
  async create(idPartner: string, articleCreateDTO: ArticleCreateDTO): Promise<Article> {
    const partner = await this.partnerModel.findById(idPartner);

    if (!partner) throw new NotFoundException();
    const article: Article = new this.articleModel(articleCreateDTO);
    partner.articles.push(article);

    await partner.save();
    return partner.articles[partner.articles.length - 1];
  }

  /**
   * Update an article for partner
   * @param idPartner
   * @param idArticle
   * @param articleUpdateDTO
   */
  async update(idPartner: string, idArticle: string,
               articleUpdateDTO: ArticleUpdateDTO): Promise<Article> {
    const partner = await this.partnerModel.findOne({ _id: idPartner }).exec();
    if (!partner) throw new NotFoundException();
    const article = partner.articles.id(idArticle);
    if (!article) throw new NotFoundException();
    article.set(articleUpdateDTO);
    await partner.save();
    return article;
  }

  /**
   * Delete an articles for partner
   * @param idPartner
   * @param idArticle
   */
  async delete(idPartner: string, idArticle: string): Promise<Article> {
    const partner = await this.partnerModel.findById(idPartner);
    if (!partner) {
      throw new NotFoundException();
    }
    const article = partner.articles.remove(idArticle);
    if (!article) throw new NotFoundException();
    await partner.save();
    return partner.articles.id(idArticle);
  }
}
