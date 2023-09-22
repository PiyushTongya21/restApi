import { Prisma } from '@prisma/client';
import { MinLength, IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  name: string;

}
