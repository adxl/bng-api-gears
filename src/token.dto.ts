import { IsString, IsUUID } from 'class-validator';

export class TokenDto {
  @IsString()
  token: string;

  @IsUUID()
  userId: string;
}
