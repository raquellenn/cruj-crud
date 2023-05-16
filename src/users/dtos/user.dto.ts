import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  id?: bigint;
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
}
