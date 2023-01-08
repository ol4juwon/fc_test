import { Logger, Module } from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    BrandsModule,
    UsersModule,
    AddonsModule,
    CategoryModule,
    ConfigModule.forRoot(),
    ObjectionModule.forRootAsync({
      useFactory: () => ({
        Model,
        config: {
          client: 'pg',
          useNullAsDefault: true,
          connection: {
            host: '127.0.0.1',
            port: 5432,
            user: 'concher_admin',
            password: 'concher1234',
            database: 'foodcourt',
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
