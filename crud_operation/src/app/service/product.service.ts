import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../modal/product-modal';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3000/product"
  constructor(private _httpClient:HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.baseUrl);
  }

  AddProduct(requestedObject:Product): Observable<Product> {
    return this._httpClient.post<Product>(this.baseUrl,requestedObject);
  }

  updateProduct(productId:string|undefined,requestedObject:Product): Observable<Product> {
    return this._httpClient.put<Product>(`${this.baseUrl}/${productId}`,requestedObject);
  }

  deleteProduct(productId:string|undefined): Observable<Product> {
    return this._httpClient.delete<Product>(`${this.baseUrl}/${productId}`);
  }
}
