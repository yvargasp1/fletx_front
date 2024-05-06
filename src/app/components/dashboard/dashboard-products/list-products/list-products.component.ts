import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category/category.service';
import { ProductService } from '../../../../services/product/product.service';
import { Product } from '../../../../models/Product.dto';
import { Category } from '../../../../models/Category.dto';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
  constructor(private categoryService :CategoryService, private productService:ProductService){

  }
  listCategories : Category[]=[]
  listProducts:Product[]=[]
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next :(value)=> {
            this.listCategories = value
      },
      error :(err)=> {
          console.log(err)
      },
    })
    this.productService.getProducts('price', null, null, null).subscribe({
      next: (value) => {
        this.listProducts = value;
        console.log(this.listProducts)
      },
      error: (err) => {
        console.log(err);
      },
    });
    
  }

  
}
