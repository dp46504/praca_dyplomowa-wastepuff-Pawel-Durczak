import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsNumber()
  @IsNotEmpty()
  left: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class UpdatePackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsNumber()
  @IsNotEmpty()
  left: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class PatchPackDto {
  @IsNumber()
  @IsNotEmpty()
  left: number;
}
