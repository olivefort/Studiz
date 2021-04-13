
import { CategoryCreateDTO } from '../category/category.dto.create';

/* Template for creating an Partner */
export class PartnerCreateDTO {
  public readonly id: string;
  public readonly setting: {
    readonly informations: {
      readonly name: string,
      readonly url: string,
      readonly description: string,
    },
    readonly position: {
      readonly address: string,
      readonly description: string,
    },
    readonly contact: {
      readonly email: string,
      readonly phone: string,
    },
    readonly schedule: {
      readonly day: string,
      readonly hour: string,
    },
  };
  public readonly orders: [{
    readonly profile: string,
    readonly articles: [
      {
        readonly title: string,
        readonly quantity: number,
        readonly price: number,
      },
    ],
    readonly status: {
      readonly value: string,
      readonly updatedat: string,
    },
    readonly category: CategoryCreateDTO[];
    readonly date: Date,
  }];
  readonly category: CategoryCreateDTO[];
}
