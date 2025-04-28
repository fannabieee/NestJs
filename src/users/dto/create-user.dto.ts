import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name : string;

  @IsEmail({},{
    message: 'Email must be a valid email',
  })
  @IsNotEmpty({
    message: 'Email address required',
  })
  email : string;

  @IsNotEmpty({
    message: 'Password required',
  })
  password: string;
  address: string;
}

