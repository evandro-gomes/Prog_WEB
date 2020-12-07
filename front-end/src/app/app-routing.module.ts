import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PecaListComponent } from './peca/peca-list/peca-list.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { FuncionarioListComponent } from './funcionario/funcionario-list/funcionario-list.component';

const routes: Routes = [
  {path: 'peca', component: PecaListComponent},

  {path: 'cliente', component: ClienteListComponent},

  {path: 'funcionario', component: FuncionarioListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
