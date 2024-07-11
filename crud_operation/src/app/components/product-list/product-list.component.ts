import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, first } from 'rxjs';
import { Product } from 'src/app/modal/product-modal';
import { ADD_PRODUCT_LIST } from 'src/app/modal/shared-paths';
import { ProductService } from 'src/app/service/product.service';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TableModule,HttpClientModule,NgxChartsModule,ConfirmPopupModule,ToastModule],
  providers:[ProductService,ConfirmationService,MessageService],
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productList$!: Observable<Array<Product>>;
  view:any = [600, 400];
  width: number = 700;
  height: number = 300;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Product Name';
  showYAxisLabel = true;
  yAxisLabel = 'Product Price';
  productChartInfo:any;

  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  constructor(private _proudctService: ProductService, private _router: Router,private _confirmationService:ConfirmationService,private _messageService:MessageService) {
    this.productList$ = this._proudctService.getProductList();

    this.productList$.pipe().subscribe((product)=>{
      this.productChartInfo = product.map((productInfo)=>{
        return {
          name:productInfo.productName,
          value:productInfo.productPrice
        }
      })
    })
  }

  onEdit(product:Product){
    const QUERY_PARAMS = {
      object: JSON.stringify(product)
    };
    this._router.navigate([`/${ADD_PRODUCT_LIST}`],{queryParams:QUERY_PARAMS})
  }

  onDelete(event:any,product:Product){
    this._confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._proudctService.deleteProduct(product.id).pipe(first()).subscribe((product)=>{
          if(product){
            this._messageService.add({ severity: 'success', summary: 'Product', detail: 'Product Deleted Successfully.' });
            this.productList$ = this._proudctService.getProductList();
          }
        }) 
      },
      reject: () => {
        this._messageService.add({ severity: 'danger', summary: 'Product', detail: 'User is not able to delete the product.' });

      }
  });
  }

  onAdd() {
    this._router.navigate([`/${ADD_PRODUCT_LIST}`])
  }
}
