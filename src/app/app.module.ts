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
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore  } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {provideStorage, getStorage} from '@angular/fire/storage'
@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    DashboardProductsComponent,
  ],
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SidebarModule,
    InputNumberModule,
    InputTextModule,
    ToastModule,
    CalendarModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage())
  ],
  providers: [CategoryService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
