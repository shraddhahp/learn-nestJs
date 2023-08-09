import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService, } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';




@Module({
  imports: [ProductsModule,ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: '0.0.0.0',
        port: 5438,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  
  
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
