import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
  constructor(private categoryService :CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next :(value)=> {
            console.log(value)
      },
    })
  }

  
}
