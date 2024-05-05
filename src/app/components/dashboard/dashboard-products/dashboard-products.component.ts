import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './dashboard-products.component.html',
  styleUrls: ['./dashboard-products.component.css'],
})
export class DashboardProductsComponent {
  sidebarVisible : boolean = false

  onMenu(){
    this.sidebarVisible = this.sidebarVisible ? false : true;
  }
}
