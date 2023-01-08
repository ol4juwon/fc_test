import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const emailExists = await this.userModel.query().where({
        email: createUserDto.email,
      });
      if (emailExists[0]) return { error: 'user with email already exists' };
      const usernameExists = await this.userModel.query().where({
        username: createUserDto.username,
      });
      if (usernameExists[0])
        return { error: 'user with username already exists' };
      createUserDto.password = await bcrypt.hashSync(
        createUserDto.password,
        10,
      );
      const roles = createUserDto.roles.join(',');
      delete createUserDto.roles;
      const newUser = { ...createUserDto, roles };
      console.log(newUser);
      const addingUser = await this.userModel.query().insert(newUser);
      return { data: addingUser };
    } catch (error) {
      // console.log(error);
      return { error };
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async getUser(email: string) {
    console.log('eee', email);
    try {
      const response = await this.userModel
        .query()
        .select()
        .where({
          email: email,
        })
        .limit(1);
      console.log(response);
      if (response[0]) {
        return response[0];
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
