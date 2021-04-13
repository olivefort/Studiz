
/* Template for creating an order */
export class OrderCreateDTO {
  public readonly id: string;
  public readonly profile: string;
  public readonly articles:[
        {title: string, quantity:number, price: number}
  ];
  public readonly status:
  {value: string, updatedAt: Date};
  public readonly date: Date;
  public readonly user: [{
    informations: {
      name: String,
      lastname: String,
    };
    position: {
      address: String,
    };
    contact: {
      email: String,
      phone: String,
    };
  }];
}
