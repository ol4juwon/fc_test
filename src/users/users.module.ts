import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { User } from './model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/local.auth';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [AuthService, UsersService, ConfigService, LocalStrategy],
  imports: [
    ObjectionModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class UsersModule {}
