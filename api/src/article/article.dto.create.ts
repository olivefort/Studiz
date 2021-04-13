import { CategoryCreateDTO } from '../category/category.dto.create';

export class ArticleCreateDTO {
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: CategoryCreateDTO[];
  readonly url: string;
}
