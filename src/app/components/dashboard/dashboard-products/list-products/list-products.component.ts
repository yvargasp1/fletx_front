import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { CategoryService } from '../../../../services/category/category.service';
import { ProductService } from '../../../../services/product/product.service';
import { Product } from '../../../../models/Product.dto';
import { Category } from '../../../../models/Category.dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private messageService: MessageService
  ) {}
  listCategories: Category[] = [];
  listProducts: Product[] = [];
  @Output()
  event = new EventEmitter<any>();
  listProductsCart: Product[] = [];
  @Input()
  empty: boolean = false;
  @Input()
  add: boolean = false;
  @Output()
  eventoE = new EventEmitter<any>();
  @Output()
  eventoAdd = new EventEmitter<any>();
  @Output()
  eventEdit = new EventEmitter<any>();
  minPrice = Infinity;
  maxPrice = -Infinity;
  listOrder: any[] = [
    {
      name: 'Más reciente',
      value: 'id',
      order: 'DESC',
    },
    {
      name: 'Más antiguo',
      value: 'id',
      order: 'ASC',
    },
    {
      name: 'Menor precio',
      value: 'price',
      order: 'ASC',
    },
    {
      name: 'Mayor precio',
      value: 'price',
      order: 'DESC',
    },
    {
      name: 'Menor cantidad',
      value: 'stock',
      order: 'ASC',
    },
    {
      name: 'Mayor cantidad',
      value: 'stock',
      order: 'DESC',
    },
  ];
  selectOrder: any = {
    value: 'id',
    order: 'ASC',
  };
  rangeValues: number[] = [this.minPrice, this.maxPrice];
  ngOnChanges() {
    if (this.empty) {
      this.listProductsCart = [];
      console.log('Empty');
    }
    console.log('Add', this.add);
    if (this.add) {
      this.ngOnInit();
      this.selectOrder = {
        value: 'id',
        order: 'ASC',
      };
      this.eventoAdd.emit(false);
    }
  }
  onFilterRange() {
    let listCategoriesId: any[] = [];
    console.log(this.listCategories, this.selectOrder);
    this.listCategories.forEach((item) => {
      if (item.check) {
        listCategoriesId.push(item.id);
      }
    });

    this.productService
      .getProducts(
        this.selectOrder.value,
        listCategoriesId,
        this.selectOrder.order
      )
      .subscribe({
        next: (value) => {
          this.listProducts = value.filter(
            (product: Product) =>
              product.price >= this.rangeValues[0] &&
              product.price <= this.rangeValues[1]
          );
          console.log(this.listProducts);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  deleteFilters() {
    this.ngOnInit();
    this.selectOrder = {
      value: 'id',
      order: 'ASC',
    };
  }
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (value) => {
        this.listCategories = value;
        this.listCategories.forEach((item) => {
          item.check = false;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.productService.getProducts('id', null, 'DESC').subscribe({
      next: (value) => {
        this.listProducts = value;
        this.listProducts.forEach((item) => {
          item.price;
        });

        this.listProducts.forEach((item) => {
          this.minPrice = Math.min(this.minPrice, item.price);
          this.maxPrice = Math.max(this.maxPrice, item.price);
        });

        // Asignar los valores mínimos y máximos al arreglo rangeValues
        this.rangeValues = [this.minPrice, this.maxPrice];
        console.log(this.rangeValues);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onSaveProduct(item: Product) {
    // Check if the cart is not empty
    if (this.listProductsCart.length) {
      // Check if the item already exists in the cart
      const existingItem = this.listProductsCart.find(
        (cartItem) => cartItem.id === item.id
      );

      // If the item already exists, do nothing
      if (existingItem) {
        console.log('Existe');
        this.messageService.add({
          severity: 'info',
          summary: 'Producto',
          key: 'product',
          detail: `${existingItem.name} previamente agregado.`,
        });
        return;
      }
    }

    // If the item doesn't exist in the cart, add it
    console.log(this.listProductsCart);
    if (item.stock == 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Producto',
        key: 'product',
        detail: `${item.name} no disponible.`,
      });
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Producto',
        key: 'product',
        detail: `${item.name}  agregado al carrito.`,
      });
      this.listProductsCart.push(item);
      this.event.emit(this.listProductsCart);
      this.eventoE.emit(false);
    }
  }
  onEdit(item: any) {
    this.eventEdit.emit(item);
  }
  onDeleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe({
      next :(value:any)=> {
        console.log(value)
        if ((value.status = 302 && value.response)) {
          this.messageService.add({
            severity: 'info',
            summary: 'Producto',
            key: 'product',
            detail: `Esta relacionado a una venta.`,
          });
        }
        if (value.affected) {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto',
            key: 'product',
            detail: `Eliminado`,
          });
          this.ngOnInit();
        }
      },
      error:(err)=> {
        console.log(err)
          this.messageService.add({
            severity: 'error',
            summary: 'Producto',
            key: 'product',
            detail: `Eliminado`,
          });
      },
    })
  }
}
