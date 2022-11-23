import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterPayloadDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
