import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtservice: JwtService,
    private configService: ConfigService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async validateUser(loginDto) {
    const user = await this.userService.getUser(loginDto.email);
    console.log('ddd', user);
    if (!user) {
      return null;
    }

    const validPassword = await bcrypt.compareSync(
      loginDto.password,
      user.password,
    );
    if (user && validPassword) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      name: `${user.firstName} ${user.lastName}`,
    };
    console.log('payload', payload);
    return {
      accessToken: this.jwtservice.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        algorithm: 'HS256',
        expiresIn: '1h',
      }),
    };
  }
}
