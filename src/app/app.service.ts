import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './models/product';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(itemPerPage: number, page: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      environment.uri + `productos/${itemPerPage}/${page}`
    );
  }

  getProductByWord(word: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.uri + `productos/${word}`);
  }
}
