import { CategoryUpdateDTO } from '../category/category.dto.update';

/* Template for updating an article */
export class ArticleUpdateDTO {
  public readonly title: string;
  public readonly price: number;
  readonly description: string;
  public readonly category: CategoryUpdateDTO[];
  public readonly url: string;
}
