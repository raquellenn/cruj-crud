import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  id?: string;
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
}
