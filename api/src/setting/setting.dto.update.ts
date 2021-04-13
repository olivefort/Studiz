/* Template for creating setting from partner */
export class SettingUpdateDTO {
  public readonly informations: {
    readonly name: string;
    readonly url: string;
    readonly description: string;
  };
  public readonly position: {
    readonly address: string;
    readonly description: string;
  };
  public readonly contact: {
    readonly email: string;
    readonly phone: string;
  };
  public readonly schedule: {
    readonly day: string;
    readonly hour: string;
  };
}
