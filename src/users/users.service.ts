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
    let user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    let users = await this.userModel.find();
    return users;
  }

 async findOne(id: number) {
   let user = await this.userModel.findById(id);
   return user;
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userModel.updateOne(UpdateUserDto);
    return user;
  }

 async remove(id: number) {
   let user = await this.userModel.deleteOne();
   return user;
 }

}
