import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ADD_PRODUCT_LIST, PRODUCT_LIST } from './modal/shared-paths';

const routes: Routes = [{
  path: `${PRODUCT_LIST}`,
  loadComponent: () =>
    import('./components/product-list/product-list.component').then((product) => product.ProductListComponent),
},
{
  path: `${ADD_PRODUCT_LIST}`,
  loadComponent: () =>
    import('./components/add-product/add-product.component').then((product) => product.AddProductComponent),
},
{
  path: '', redirectTo: `${PRODUCT_LIST}`, pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
