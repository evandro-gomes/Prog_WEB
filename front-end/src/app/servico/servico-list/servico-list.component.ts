import { ServicoService } from './../servico.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.scss']
})
export class ServicoListComponent implements OnInit {
  // entidade no plural
  servicos: any = []
  // colunas exibidas na tabela e sua ordem
  displayedColumns: string[] = ['cliente', 'veiculo', 'funcionario', 'peca', 'descricao', 'periodo', 'editar', 'excluir']

  constructor(
    private servicoSrv: ServicoService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.servicos = await this.servicoSrv.listar()
    console.log(this.servicos)
  }

  async excluir(id: string) {
    if(confirm('Deseja realmente excluir?')){
      try {
        await this.servicoSrv.excluir(id)
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
