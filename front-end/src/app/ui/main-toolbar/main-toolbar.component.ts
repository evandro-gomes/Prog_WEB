import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {
  //Atributos @Input() recebem valores do pai
  @Input() appname : string

  constructor() { }

  ngOnInit(): void {
  }

}
