import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { product } from "src/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports :[ TypeOrmModule.forFeature([product]),],
    controllers : [ProductsController],
    providers : [ProductsService]
})

export class ProductsModule{
    
}