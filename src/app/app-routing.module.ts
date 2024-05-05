import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardProductsComponent } from './components/dashboard/dashboard-products/dashboard-products.component';


const routes: Routes = [{
  path:'',
  component : DashboardProductsComponent
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}