import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class productDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(8)
  description: string;

  @IsNotEmpty()
  @IsEmail()
  price: number;
}