import { UserCreateDTO } from "src/user/user.dto.create";

/* Template for creating an authentication for partner */
export class AuthenticationPartnerCreateDTO {
  public readonly email: string;
  public readonly password: string;
  public readonly partner: string;
}

/* Template for creating an authentication for customer */
export class AuthenticationClientCreateDTO {
  public readonly email: string;
  public readonly password: string;
  public readonly user: UserCreateDTO[];
}
