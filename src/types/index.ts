import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UserRole } from './user-role';

export class EntityReference {
  @IsUUID(4)
  id: string;
}

export class RequestPayload {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString({ each: true })
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
