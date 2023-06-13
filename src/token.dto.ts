import { IsOptional, IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  token: string;

  @IsOptional()
  userId: string;
}
