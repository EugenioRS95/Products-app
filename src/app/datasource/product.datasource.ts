import {DataSource} from '@angular/cdk/collections';
import { Product } from '../models/product';
import {Observable, ReplaySubject} from 'rxjs';

export class ProductsDataSource extends DataSource<Product> {
  private _dataStream = new ReplaySubject<Product[]>();

  constructor(initialData: Product[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Product[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Product[]) {
    this._dataStream.next(data);
  }
}
