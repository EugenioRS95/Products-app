import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductService } from 'src/app/app.service';
import { Product } from 'src/app/models/product';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  myControl = new FormControl('');
  productNames: string[] = [];
  products?: Product[];
  filteredOptions?: Observable<string[]>;

  @Output() productSelectedEmitter = new EventEmitter<string>();

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.productService.getProductByWord(filterValue).subscribe(products => {
      this.productNames = products.flatMap(product => product.name);
    }); 
    return this.productNames.filter(productName => productName.toLowerCase().includes(filterValue));
  }

  selectOption(data: string){
    this.sendProductSelected(data);
  }

  sendProductSelected(productName: string) {
    this.productSelectedEmitter.emit(productName);
  }
}
