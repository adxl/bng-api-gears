import { IsUUID } from 'class-validator';

export class EntityReference {
  @IsUUID(4)
  id: string;
}
