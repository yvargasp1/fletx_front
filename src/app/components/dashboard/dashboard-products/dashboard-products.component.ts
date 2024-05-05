import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../models/Category.dto';
import { FirebaseService } from '../../../services/firebase/firebase.service';
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
    category_id: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    stock: new FormControl(1, Validators.required),
    file: new FormControl(''),
  });
  listCategories: any[] = [];
  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private firebaseService: FirebaseService
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

  onMenu() {
    this.sidebarVisible = this.sidebarVisible ? false : true;
  }
  onCategory() {
    this.formVisibleCategory = this.formVisibleCategory ? false : true;
    this.onMenu();
  }
  onProduct() {
    this.formVisibleProduct = this.formVisibleProduct ? false : true;
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
            summary: 'Categoría',
            detail: `${value.name} creada con éxito.`,
          });
          this.onCategory();
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'success',
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
  onSaveProduct() {
    if (this.file) {
      this.firebaseService.addPhoto(this.file);
    } else {
      ('No archivo');
    }
  }
}
