import { Component, ViewChild } from '@angular/core';
import { ProductService } from './app.service';
import { Product } from './models/product';
import {MatSort} from '@angular/material/sort';
import {Sort} from '@angular/material/sort';
import { ProductsDataSource } from './datasource/product.datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['name',  'brand', 'category','status'];
  products!: Product[];
  dataSource = new ProductsDataSource(this.products);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts(10,1).subscribe(prods => {      
      this.products = prods.slice();
      this.dataSource.setData(this.products);
    });
  }

  sortProduct(sort: Sort) {
    const data = this.products.slice();

    if (!sort.active || sort.direction === '') {
      this.products = data;
      return;
    }

    this.products = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource.setData(this.products);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  selectProduct(name: string){
    this.productService.getProductByWord(name).subscribe(products => {
      this.products = products;
      this.dataSource.setData(this.products);
    })
  }

}

