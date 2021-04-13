import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards, HttpCode, HttpStatus, Query }
  from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './article.dto.create';
import { ArticleUpdateDTO } from './article.dto.update';
import { ArticleSearchDTO } from 'src/article/article.dto.search';
import { Category } from 'src/category/category';
import { AuthParamsIdGuard } from '../shared/guards/user.guard';
import { AuthToken, AuthTokenModel } from 'src/shared/decorators/auth-token.decorator';

@Controller('partners/:idPartner')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) { }

  /**
   * Recovery of all articles
   * @param idPartner
   */
  @Get('articles')
  async readAll(@Param('idPartner') idPartner: string) {
    return await this.articleService.getAll(idPartner);
  }

  /**
   * Recovery of an article by id
   * @param idPartner
   * @param idArticle
   */
  @Get('articles/:idArticle')
  async readArticle(@Param('idPartner') idPartner: string, @Param('idArticle') idArticle: string) {
    return await this.articleService.getById(idPartner, idArticle);
  }

  /**
   * Recovery on an article by search
   * @param idPartner
   * @param articleSearchDTO
   */
  @Get('article/search')
  async searchArticle(@Param('idPartner') idPartner: string,
                      @Query() articleSearchDTO: ArticleSearchDTO) {
    const articles = await this.articleService.search(idPartner, articleSearchDTO);
    return articles;
  }

/**
 * Recovery an article by categories
 * @param idPartner
 */
  @Get('categories')
  async readArticleCategory(@Param('idPartner') idPartner: string) {
    return await this.articleService.getCategories(idPartner);
  }

  /**
   * Recovery an article by title
   * @param idPartner
   */
  @Get('title')
  async readArticleTitle(@Param('idPartner') idPartner: string) {
    return await this.articleService.getTitles(idPartner);
  }

  /**
   * Create an article
   * @param idPartner
   * @param articleCreateDTO
   */
  @Post('articles')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'), AuthParamsIdGuard)
  async  createArticle(@AuthToken() auth: AuthTokenModel,
                       @Body() articleCreateDTO: ArticleCreateDTO) {
    return await this.articleService.create(auth.user.toHexString(), articleCreateDTO);
  }

  /**
   * Update an article
   * @param idPartner
   * @param idArticle
   * @param articleUpdateDTO
   */
  @Put('articles/:idArticle')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), AuthParamsIdGuard)
  async updateArticle(@AuthToken() auth: AuthTokenModel,
                      @Param('idArticle') idArticle: string,
                      @Body() articleUpdateDTO: ArticleUpdateDTO) {
    return await this.articleService.update(auth.user.toHexString(), idArticle, articleUpdateDTO);
  }

  /**
   * Delete an article
   * @param idPartner
   * @param idArticle
   */
  @Delete('articles/:idArticle')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'), AuthParamsIdGuard)
  async removeArticle(@AuthToken() auth: AuthTokenModel,
                      @Param('idArticle') idArticle: string) {
    await this.articleService.delete(auth.user.toHexString(), idArticle);
  }
}
