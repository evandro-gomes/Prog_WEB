import { PecaService } from './../peca.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-peca-list',
  templateUrl: './peca-list.component.html',
  styleUrls: ['./peca-list.component.scss']
})
export class PecaListComponent implements OnInit {
  // entidade no plural
  pecas: any = []
  // colunas exibidas na tabela e sua ordem
  displayedColumns: string[] = ['marca', 'funcao', 'compat', 'valor', 'editar', 'excluir']

  constructor(
    private pecaSrv: PecaService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.pecas = await this.pecaSrv.listar()
    console.log(this.pecas)
  }

  async excluir(id: string) {
    if(confirm('Deseja realmente excluir?')){
      try {
        await this.pecaSrv.excluir(id)
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
