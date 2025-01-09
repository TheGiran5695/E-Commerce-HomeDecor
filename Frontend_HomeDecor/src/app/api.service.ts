import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  productsSource = new BehaviorSubject([]);
  currentProducts = this.productsSource.asObservable();
  productsTemp = [];

  getProducts(){
    this.http.get(environment.apiUrl + '/api/apiData/Explore/DataStructure/AllProducts').subscribe((data:any) =>{
      this.productsSource.next(data)
      this.productsTemp = data;
    })
  }

  searchProducts(searchText:string){
    this.http.get(environment.apiUrl + '/api/apiData/Explore/DataStructure/AllProducts', {
      params: { keyword: searchText }
    }).subscribe((data:any) =>{
      this.productsSource.next(data)
    })
  }

  clearSearch(searchText:string){
    if(searchText == ''){
      this.productsSource.next(this.productsTemp)
    }
  }

  getSingleProduct(id:string){
    return this.http.get(environment.apiUrl + '/api/apiData/Explore/DataStructure/AllProducts/' + id)
  }

  orderCreate(order:any){
    return this.http.post(environment.apiUrl + '/api/apiData/Explore/DataStructure/orderData/order/order', order)
  }

  filterProducts(filters: { category?: string; minPrice?: number; maxPrice?: number; minRating?: number }){
    this.http.get(environment.apiUrl + '/api/apiData/Explore/DataStructure/AllProducts', {
      params: {
        category: filters.category || '',
        minPrice: filters.minPrice?.toString() || '',
        maxPrice: filters.maxPrice?.toString() || '',
        minRating: filters.minRating?.toString() || ''
      }
    }).subscribe((data:any) => {
      this.productsSource.next(data.products)
    })
  }
  
}
