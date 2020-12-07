import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-main-toolbar [appname]="title"></app-main-toolbar>
    <div id="content">
        <router-outlet></router-outlet>
    </div>
    <app-main-footer></app-main-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'Trabalho Prog_WEB - automecânica';
}