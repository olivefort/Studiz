import {
  Controller, Get, Param, Post, HttpCode,
  HttpStatus, UseGuards, Body, Put, Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { CategoryCreateDTO } from './category.dto.create';
import { CategoryUpdateDTO } from './category.dto.update';
import { AuthParamsIdGuard } from 'src/shared/guards/user.guard';
import { AuthToken, AuthTokenModel } from 'src/shared/decorators/auth-token.decorator';

@Controller('partners/:idPartner')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  /**
   * Get categories
   * @param idPartner
   */
  @Get('category')
  async readCategory(@Param('idPartner') idPartner: string) {
    return await this.categoryService.getCategories(idPartner);
  }

    /**
     * Get category by id
     * @param idPartner
     * @param idCategory
     */
  @Get('category/:idCategory')
  // tslint:disable-next-line: max-line-length
  async readOneCategory(@Param('idPartner') idPartner: string, @Param('idCategory') idCategory: string) {
    return await this.categoryService.getById(idPartner, idCategory);
  }

  /**
   * Create category
   * @param idPartner
   * @param categoryCreateDTO
   */
  @Post('category')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  async  createCategory(@AuthToken() auth: AuthTokenModel,
                        @Body() categoryCreateDTO: CategoryCreateDTO) {
    return await this.categoryService.create(auth.user.toHexString(), categoryCreateDTO);
  }

    /**
     * Update category
     * @param idPartner
     * @param idCategory
     * @param categoryUpdateDTO
     */
  @Put('category/:idCategory')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    async updateCategory(@AuthToken() auth: AuthTokenModel,
                         @Param('idCategory') idCategory: string,
                         @Body() categoryUpdateDTO: CategoryUpdateDTO) {
    return await this.categoryService.update(auth.user.toHexString(), idCategory, categoryUpdateDTO);
  }

    /**
     * Delete category
     * @param idPartner
     * @param idCategory
     */
  @Delete('category/:idCategory')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'))
    async removecategory(@AuthToken() auth: AuthTokenModel,
                         @Param('idCategory') idCategory: string) {
    await this.categoryService.delete(auth.user.toHexString(), idCategory);
  }
}
