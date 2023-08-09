import { Controller, Post,Body, Get,Param,Patch,ParseIntPipe,UsePipes,ValidationPipe, Delete, ParamData} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { productDto } from "./products.dto";

@Controller('products')
export class ProductsController{
    constructor(private readonly productsService : ProductsService){}

    @Post( )
    addProduct( @Body() allData : productDto ) : any {
        const result = this.productsService.insertProduct(allData)
        return result
      
    }

    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getOneProduct(@Param('id') prodId: string ) {
        console.log(prodId)
        return this.productsService.getOneProduct(prodId)
    }

    @Patch(':id')
    updateProduct(
        @Param() p: ParamData, 
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc :string, 
        @Body('price') prodPrice :number){
        
        return this.productsService.updateProduct(p['id'], prodTitle, prodDesc, prodPrice)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id : string){
        //const prodId = parseInt(id)
        return this.productsService.deleteProduct(id)
    }
    

    
}