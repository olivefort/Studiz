export class UserUpdateDTO {
  public readonly id: string;
  public readonly setting: {
    readonly informations: {
      readonly name: string;
      readonly lastname: string;
    };
    readonly position: {
      readonly address: string;
    };
    readonly contact: {
      readonly email: string;
      readonly phone: string;
    };
  };
  public readonly orders: [
    {
      readonly profile: string;
      readonly status: [
        {
          readonly value: string;
          readonly udpdateAt: string;
        }
      ];
      readonly articles: [
        {
          readonly title: string;
          readonly price: string;
          readonly quantity: string;
        }
      ];
    }
  ];
}
