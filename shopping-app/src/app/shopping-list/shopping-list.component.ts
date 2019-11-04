import { Component, OnInit } from '@angular/core';
import {RestService} from '../service/rest.service';
import {List} from '../service/list';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private service: RestService) { }
  lists: List[] = [];
  list: List = {
    id: null,
    product: ''
  };

  valid=true;
  price: number;

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.service.getAll().subscribe(
      value => {this.lists = value; },
      error => {alert('Nie można załadować listy zakupów'); },
      () => {});
  }

  async save() {
    if (this.list.product.length === 0) {
      this.valid = true;
      return;
    }
    this.valid=true;
    this.service.save(this.list).subscribe(value => {
      this.lists.push(value);
      this.list = {
        id: null,
        product: ''
      };
      this.valid=false;
      }, error => {}, () => {});
  }

  async delete(list: List) {
    if (confirm('Jestes pewny ze chcesz usunac ten produkt z list?')) {
      const index = this.lists.indexOf(list);
      this.service.delete(list).subscribe();
      this.lists.splice(index, 1);
    }
  }

   update(list: List) {
    this.service.save(list).subscribe(value => {},error => {},() => {});
  }

  archieve() {
    if (!this.price.toString().trim().match('^-?[0-9]\\d*(\\.\\d{1,4})?$')) {
      return;
    }
    this.service.saveArchive(this.price).subscribe(value => {
      this.lists = [];
    });
    this.price=null;
  }
}
