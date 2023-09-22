import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  categories: string[];
}
