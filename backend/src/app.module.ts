import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { ConfigDatabaseModule } from './config/config.module';
import { databaseConfig } from './config/db.config';
import { GlobalExceptionFilter } from './utils/error-handler';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigDatabaseModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    AuthModule, 
    UserModule, 
    ProductsModule, 
    OrdersModule, 
    ],
  controllers: [AppController],
  providers: [AppService, {provide:APP_FILTER, useClass: GlobalExceptionFilter}],
})
export class AppModule {}
