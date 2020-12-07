import { ClienteService } from './../cliente.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {
  // entidade no plural
  clientes: any = []
  // colunas exibidas na tabela e sua ordem
  displayedColumns: string[] = ['nome', 'cpf', 'rg', 'endereco', 'telefone', 'email', 'editar', 'excluir']

  constructor(
    private clienteSrv: ClienteService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.clientes = await this.clienteSrv.listar()
    console.log(this.clientes)
  }

  async excluir(id: string) {
    if(confirm('Deseja realmente excluir?')){
      try {
        await this.clienteSrv.excluir(id)
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
