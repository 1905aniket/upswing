import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Product } from 'src/app/modal/product-modal';
import { ProductFormGroup } from 'src/app/modal/proudct-formcontrol-modal';
import { PRODUCT_LIST } from 'src/app/modal/shared-paths';
import { ProductService } from 'src/app/service/product.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  providers: [MessageService, ProductService],
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productFormGroup!: FormGroup<ProductFormGroup>;
  product!: Product;

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _activatedRoute: ActivatedRoute, private _productService: ProductService, private _toasterService: MessageService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this._activatedRoute.queryParamMap.subscribe(params => {
      const PRODUCT_OBJECT = params.get('object');
      if (PRODUCT_OBJECT) {
       this.product = JSON.parse(PRODUCT_OBJECT);
       this.productFormGroup.patchValue(this.product);
      }
    });
  }

  initializeForm() {
    this.productFormGroup = this._formBuilder.group<ProductFormGroup>({
      productName: new FormControl("", [Validators.required]),
      productCategory: new FormControl("", [Validators.required]),
      productPrice: new FormControl(0, [Validators.required]),
    })
  }

  backToList() {
    this._router.navigate([`/${PRODUCT_LIST}`])
  }

  onSubmit() {
    if (this.productFormGroup.invalid) {
      return;
    }
    this._productService.AddProduct(this.productFormGroup.value).pipe(first()).subscribe((product: Product) => {
      if (product) {
        this._toasterService.add({ severity: 'success', summary: 'Product', detail: 'Product Added Successfully.' });
        this.backToList();
      }
    })
  }

  onUpdate() {
    if (this.productFormGroup.invalid) {
      return;
    }
    if(this.product){
      this._productService.updateProduct(this.product?.id,this.productFormGroup.value).pipe(first()).subscribe((product: Product) => {
        if (product) {
          this._toasterService.add({ severity: 'success', summary: 'Product', detail: 'Product Updated Successfully.' });
          this.backToList();
        }
      })
    }
  }
}
