import { ArrayNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from './user-role';

export class EntityReference {
  @IsUUID(4)
  id: string;
}

export class RequestPayload {
  @IsOptional()
  @IsUUID(4)
  id?: string;

  @IsOptional()
  @IsUUID(4, { each: true })
  @ArrayNotEmpty()
  ids?: string[];

  @IsOptional()
  @IsString()
  token?: string;

  @IsOptional()
  roles?: UserRole[] | '*';

  @IsString()
  @IsOptional()
  userId?: string;
}
