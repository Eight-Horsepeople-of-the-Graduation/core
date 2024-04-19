import { HttpStatus } from "../enums/http-status.enum";

export class HttpException extends Error {
  public response: string;
  public status: HttpStatus;

  constructor(response: string, status: number) {
    super(response);
    this.response = response;
    this.status = status;
  }
}
