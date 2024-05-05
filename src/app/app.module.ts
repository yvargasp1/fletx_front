import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppComponent } from './app.component';
import { DashboardProductsComponent } from './components/dashboard/dashboard-products/dashboard-products.component';
import { ListProductsComponent } from './components/dashboard/dashboard-products/list-products/list-products.component';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { CategoryService } from './services/category/category.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    DashboardProductsComponent,
  ],
  imports: [
    DropdownModule,
    BrowserAnimationsModule,BrowserModule,HttpClientModule,
    AppRoutingModule,
    SidebarModule,
    InputNumberModule,
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
