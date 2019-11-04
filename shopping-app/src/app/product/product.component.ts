import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {List} from '../service/list';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../service/rest.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  private product: List;
  @Output()
  private emitter: EventEmitter<List> = new EventEmitter<List>();
  @Output()
  private emitterUpdate: EventEmitter<List> = new EventEmitter<List>();


  constructor(private service: RestService) { }

  ngOnInit() {
  }

  delete(product: List) {
    this.emitter.emit(product);
  }

  update(product: List) {
    this.emitterUpdate.emit(product);
    console.log(this.product.product);
  }
}
