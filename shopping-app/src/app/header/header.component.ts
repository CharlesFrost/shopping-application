import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Timestamp} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private htpp: HttpClient) { }

  ngOnInit() {
  }

}
