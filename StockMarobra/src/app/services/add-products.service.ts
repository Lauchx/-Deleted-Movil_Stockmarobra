import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../modules/products';
import { Stock } from '../modules/stock';
@Injectable({
  providedIn: 'root'
})

export class AddProductsService {
  private url = "https://api-stockmarobra.onrender.com/products"
  constructor(private http: HttpClient) { }

  add(): Observable<any> {
    let stock = new Stock();
    stock.quantity = parseInt((document.getElementById("currentQ") as HTMLInputElement)?.value)
    let product = new Product()
    product.name = (document.getElementById("name") as HTMLInputElement)?.value
    product.width = parseFloat((document.getElementById("width") as HTMLInputElement)?.value)
    product.height = parseFloat((document.getElementById("height") as HTMLInputElement)?.value)
    product.length = parseFloat((document.getElementById("length") as HTMLInputElement)?.value)
    product.stock = stock
    return this.http.post(this.url, product, { observe: 'response' })
  }

  get(): Observable<any> {
    return this.http.get(this.url)
  }
  // delete(id: string): Observable<any>{
  //   return this.http.delete(this.url, id, {Header: string})
  // }
  delete(id: string): Observable<any> {
    return this.http.delete(this.url + "/" + id)
  }
  upgrade(id: string): Observable<any> {
    let product = new Product()
    return this.http.put(this.url + "/" + id, product)
  }
  getById(id: string): Observable<any>{
    return this.http.get(this.url + "/" + id)
  }
}
