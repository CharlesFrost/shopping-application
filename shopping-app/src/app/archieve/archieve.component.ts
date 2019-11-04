import { Component, OnInit } from '@angular/core';
import {Archieve} from '../service/archieve';
import {RestService} from '../service/rest.service';

@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.css']
})
export class ArchieveComponent implements OnInit {
  archieves: Archieve[];
  content: string[];
  text: string='';

  constructor(private service: RestService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAllArchives().subscribe(value => {
      this.archieves = value;
    });
  }

}
