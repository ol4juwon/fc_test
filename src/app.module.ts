import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { UsersModule } from './users/users.module';
import { AddonsModule } from './addons/addons.module';
import { CategoryModule } from './category/category.module';
import { ObjectionModule, Model } from 'nestjs-objection/dist';
import { User } from './users/model/user.model';
import { Brand } from './brands/model/brand.model';
import { Category } from './category/model/category.model';
import { Addon } from './addons/model/addon.model';

@Module({
  imports: [
    AuthModule,
    BrandsModule,
    UsersModule,
    AddonsModule,
    CategoryModule,
    ObjectionModule.forRootAsync({
      useFactory: () => ({
        Model,
        config: {
          client: 'mysql',
          useNullAsDefault: true,
          connection: {
            host: process.env.DATABASE_HOST || '127.0.0.1',
            user: process.env.DATABASE_USER || 'ola',
            password: process.env.DATABASE_PASS || 'concheradmin',
            database: process.env.DATABASE_NAME || 'foodcourt',
          },
        },
      }),
    }),
    ObjectionModule.forFeature([User, Brand, Category, Addon]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
