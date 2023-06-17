import { IsString, IsUUID } from 'class-validator';

export class RequestToken {
  @IsString()
  token: string;

  @IsUUID()
  userId: string;
}
