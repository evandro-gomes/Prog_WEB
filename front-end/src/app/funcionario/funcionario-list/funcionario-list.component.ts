import { FuncionarioService } from './../funcionario.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.scss']
})
export class FuncionarioListComponent implements OnInit {
  // entidade no plural
  funcionarios: any = []
  // colunas exibidas na tabela e sua ordem
  displayedColumns: string[] = ['nome', 'funcao', 'salario', 'mao_obra', 'cpf', 'rg', 'endereco', 'telefone', 'email', 'editar', 'excluir']

  constructor(
    private funcionarioSrv: FuncionarioService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.funcionarios = await this.funcionarioSrv.listar()
    console.log(this.funcionarios)
  }

  async excluir(id: string) {
    if(confirm('Deseja realmente excluir?')){
      try {
        await this.funcionarioSrv.excluir(id)
        // 1. Recarregar oddados da tabela
        this.ngOnInit()
        // 2. Dar feedback para usuário com mensagem
        this.snackBar.open('Item excluído com sucesso.', 'Entendi', {
          duration: 5000 // 5 segundos
        })
      }
      catch(erro){
        // Dar feedback de erro para o usuário
        this.snackBar.open('ERRO: não foi possível excluir o item.', 'Entendi', {
          duration: 5000 // 5 segundos
        })
        console.log(erro)
      }
    }
  }

}
