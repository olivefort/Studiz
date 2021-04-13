import { Category } from 'src/category/category';

/* Template for search an article */
export class ArticleSearchDTO {
  public readonly title: string;
  public readonly category: Category[];
}
