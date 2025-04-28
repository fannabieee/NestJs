import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync,hashSync} from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

   getHashPass= (password : string) => {
    const salt = genSaltSync(10);
    const hash =  hashSync(password,salt);

    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    const hash = await hashSync(createUserDto.password);

    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hash,
      name: createUserDto.name,
      address: createUserDto.address,
    });
    return user;
  }

  async findAll() {
    let users = await this.userModel.find();
    return users;
  }

 async findOne(id: string) {
   let user = await this.userModel.findOne({
     _id: id,
   });
   return user;
  }

 async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.userModel.updateOne({id,UpdateUserDto});
    return user;
  }

 async remove(id: number) {
   let user = await this.userModel.deleteOne({id});
   return user;
 }

}
