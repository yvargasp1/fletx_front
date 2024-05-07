import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../models/Category.dto';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { Product } from '../../../models/Product.dto';

import { ProductService } from '../../../services/product/product.service';
import { SalesService } from '../../../services/sales/sales.service';
import { Sale } from '../../../models/Sale.dto';
@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css'],
})
export class DashboardProductsComponent implements OnInit {
  sidebarVisible: boolean = false;
  formVisibleCategory: boolean = false;
  formVisibleProduct: boolean = false;
  formCategory = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  formProduct = new FormGroup({
    name: new FormControl('', Validators.required),
    date_created: new FormControl(new Date(), Validators.required),
    category_id: new FormControl(null, Validators.required),
    price: new FormControl(0, Validators.required),
    value: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    stock: new FormControl(1, Validators.required),
    file: new FormControl(''),
  });
  listCategories: Category[] = [];
  visibleCart: boolean = false;
  listSale: any[] = [];
  totalSale: number = 0;
  empty: boolean = false;
  add: boolean = false;
  listCart: Product[] = [];
  visibleDialog: boolean = false;
  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private fireService: FirebaseService,
    private saleService :SalesService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (value) => {
        this.listCategories = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCart() {
    this.visibleCart = this.visibleCart ? false : true;
  }
  onMenu() {
    this.sidebarVisible = this.sidebarVisible ? false : true;
  }
  onCategory() {
    this.formVisibleCategory = this.formVisibleCategory ? false : true;
    this.formCategory.reset();
    this.onMenu();
  }
  onProduct() {
    this.formVisibleProduct = this.formVisibleProduct ? false : true;
    this.formProduct.reset();
    this.formProduct.get('price')?.setValue(0);
    this.formProduct.get('date_created')?.setValue(new Date());
    this.formProduct.get('stock')?.setValue(0);

    this.errorFile = null;
    this.file = null;
    this.onMenu();
  }
  saveCategory() {
    const category: Category = new Category();

    category.name = this.formCategory.get('name')?.value!;
    category.description = this.formCategory.get('description')?.value!;

    this.categoryService.saveCategory(category).subscribe({
      next: (value: Category) => {
        console.log(value);
        if (value) {
          this.messageService.add({
            severity: 'success',
            key: 'dash',
            summary: 'Categoría',
            detail: `${value.name} creada con éxito.`,
          });
          this.onCategory();
          this.ngOnInit();
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'success',
          key: 'dash',
          summary: 'Categoría',
          detail: `Error`,
        });
      },
    });
  }
  errorFile: any;
  file: any;
  onUploadFile(event: any) {
    if (event.target.files[0].type.startsWith('image/')) {
      this.errorFile = false;
      this.formProduct.get('file')?.setValue(event.target.files[0]);
      this.file = event.target.files[0];
      console.log(this.formProduct.get('file')?.value);
    } else {
      this.errorFile = event.target.files[0];
    }
  }
  onDeleteFile() {
    this.formProduct.get('file')?.setValue(null);
    this.file = null;
  }
  async onSaveProduct() {
    const product: Product = new Product();
    product.name = this.formProduct.get('name')?.value!;
    product.date_created = this.formProduct.get('date_created')?.value!;
    product.price = this.formProduct.get('price')?.value!;
    product.value = this.formProduct.get('value')?.value!;
    product.type = this.formProduct.get('type')?.value!;
    product.stock = this.formProduct.get('stock')?.value!;
    const category: any = this.formProduct.get('category_id')?.value!;
    product.category_id = category.id;
    if (this.file) {
      const imageURL = await this.fireService.saveImage(this.file);
      product.image = imageURL;
      console.log(product);
      this.productService.saveProduct(product).subscribe({
        next: (value) => {
          this.add = true;
          this.messageService.add({
            severity: 'success',
            key: 'dash',
            summary: 'Producto',
            detail: `${value.name} creada con éxito.`,
          });
          this.onProduct();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'success',
            key: 'dash',
            summary: 'Producto',
            detail: `Error`,
          });
        },
      });
    } else {
      this.productService.saveProduct(product).subscribe({
        next: (value) => {
          this.add = true;
          this.messageService.add({
            severity: 'success',
            key: 'dash',
            summary: 'Producto',
            detail: `${value.name} creada con éxito.`,
          });
          this.onProduct();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'success',
            key: 'dash',
            summary: 'Producto',
            detail: `Error`,
          });
        },
      });
    }
  }
  listCarts(event: any) {
    this.listCart = event;
    if (!this.listCart.length) {
      this.empty = false;
    }
    this.listCart.forEach((item: Product) => (item.amount = 1));
    this.getValueCart();
  }
  getValueCart() {
    this.totalSale = 0
    this.listCart.forEach((item: Product) => {
      this.totalSale += item.price * item.amount;
    });
  }
  viewChangeCart(item: Product) {
    if (item.amount == 1) {
      this.listCart.forEach((itemz: Product, index: number) => {
        if (item.id == itemz.id) {
          this.listCart.splice(index, 1);
        
        }
      });
       this.getValueCart();

    }
    this.getValueCart();

  }
  onEmptyCart() {
    this.listCart = [];
    this.empty = true;
    this.totalSale = 0;
  }
  onChangeEmpty(event: any) {
    this.empty = event;
  }
  onChangeAdd(event: any) {
    this.add = event;
  }
  saleProducts() {
    this.visibleDialog = true;
  }
  cancelSale() {
    this.visibleDialog = false;
  }
  onSaleProducts() {
    const sales : Sale[] = []
    this.listCart.forEach((item:Product)=>{
    const sale : Sale =  new Sale()
    sale.product_id = item.id
    sale.date_sale =  new Date()
    sale.price = item.price
    sale.amount = item.amount
    sale.total = item.amount * item.price
      sales.push(sale)
    })
    console.log(sales)
    if(sales){
      this.saleService.saveSale(sales).subscribe({
        next :()=> {
          this.messageService.add({
            severity: 'success',
            key: 'dash',
            summary: 'Venta',
            detail: `Creada con éxito.`,
          });
          this.add = true
          this.onEmptyCart()
          this.cancelSale()
          this.onCart()
        },
        error :(err)=> {
          console.log(err)
          this.messageService.add({
            severity: 'error',
            key: 'dash',
            summary: 'Venta',
            detail: `Creada con éxito.`,
          });
        },
      })
    }
  }
}
