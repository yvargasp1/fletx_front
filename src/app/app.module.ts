import { LOCALE_ID, NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import es from '@angular/common/locales/es'
import {provideStorage, getStorage} from '@angular/fire/storage'
import { registerLocaleData , DatePipe} from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';

registerLocaleData(es)
@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    DashboardProductsComponent,
  ],
  imports: [
    CheckboxModule,
    DropdownModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SidebarModule,
    DialogModule,
    InputNumberModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage())
  ],
  providers: [CategoryService, MessageService , DatePipe,{
    provide : LOCALE_ID, useValue: 'es'
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
