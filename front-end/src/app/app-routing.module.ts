import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PecaListComponent } from './peca/peca-list/peca-list.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { FuncionarioListComponent } from './funcionario/funcionario-list/funcionario-list.component';
import { VeiculoListComponent } from './veiculo/veiculo-list/veiculo-list.component';
import { ServicoListComponent } from './servico/servico-list/servico-list.component';
import { PecaFormComponent } from './peca/peca-form/peca-form.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { FuncionarioFormComponent } from './funcionario/funcionario-form/funcionario-form.component';
import { VeiculoFormComponent } from './veiculo/veiculo-form/veiculo-form.component';
import { ServicoFormComponent } from './servico/servico-form/servico-form.component';

const routes: Routes = [
  {path: 'peca', component: PecaListComponent},
  {path: 'peca/novo', component: PecaFormComponent},
  {path: 'peca/:id', component: PecaFormComponent},

  {path: 'cliente', component: ClienteListComponent},
  {path: 'cliente/novo', component: ClienteFormComponent},
  {path: 'cliente/:id', component: ClienteFormComponent},

  {path: 'funcionario', component: FuncionarioListComponent},
  {path: 'funcionario/novo', component: FuncionarioFormComponent},
  {path: 'funcionario/:id', component: FuncionarioFormComponent},

  {path: 'veiculo', component: VeiculoListComponent},
  {path: 'veiculo/novo', component: VeiculoFormComponent},
  {path: 'veiculo/:id', component: VeiculoFormComponent},

  {path: 'servico', component: ServicoListComponent},
  {path: 'servico/novo', component: ServicoFormComponent},
  {path: 'servico/:id', component: ServicoFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
