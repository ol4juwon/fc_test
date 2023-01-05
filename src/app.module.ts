import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { UsersModule } from './users/users.module';
import { AddonsModule } from './addons/addons.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, BrandsModule, UsersModule, AddonsModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
