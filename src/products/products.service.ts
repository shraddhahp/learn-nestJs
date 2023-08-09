import { Injectable, NotFoundException } from "@nestjs/common";
import { Product }  from "./product.model";
import { InjectRepository } from "@nestjs/typeorm";
import { product } from "src/typeorm";
import { Repository } from "typeorm";
import { productDto } from "./products.dto";

@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(product) private readonly productSchema: Repository<product>,
      ) {}
    products : Product[] = [
        {
            id:"id1",
            title:"test1",
            description:"this is a test",
            price:777
        }
    ];

    insertProduct(productDto : productDto){
        const newProduct = this.productSchema.create(productDto)
        return this.productSchema.save(newProduct)
        
    }

    async getAllProducts() : Promise<product[]> {
        const allProducts = await this.productSchema.query("SELECT * FROM PRODUCTS")
        //console.log(allProducts)
        return [...allProducts];
    }

    async getOneProduct(id: string): Promise<product> {
        //console.log(id)
        //const product= this.findProduct(id)[0];  
        const item = await this.findById(id)
        //const [item, index] = this.findProduct(prodId)
      if(!item){
        throw new NotFoundException('Does not exist')
      }
      return {...item} // use the spread operator, dont pass the object but rather its copy
    }


    async updateProduct(id:string, title: string, description: string, price: number ){
        const product = await this.findById(id);
        let result: any
        if(product){
          if(title){
            result = this.productSchema.update({id: id}, {title: title})
          } else if(description){
            result = this.productSchema.update({id: id}, {description: description})
          } else if(price) {
            result = this.productSchema.update({id: id}, {price: price})
          }
        } else {
          throw new NotFoundException('Does not exist')
        }
        return result
    
}

    async deleteProduct(id : string ){
        const result = await this.productSchema.delete(id)
        if(result.affected == 0){
          throw new NotFoundException('Does not exist')
        }
        return result
    }


    // private findProduct( id: string) : [Product,number] {
    //    const productIdx=this.products.findIndex( (prod) => prod.id === id )
    //    const product=this.products[productIdx];
    //    if(!product){
    //     throw new NotFoundException('Product does not exist!');
    //    }
    //    return [product,productIdx];
    // }
    private async findById(id: string): Promise<product> {
       return  await this.productSchema.query("SELECT * FROM PRODUCTS WHERE PRODUCTS.ID=id");
       
      }

}