import { VeiculoService } from './../veiculo.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.scss']
})
export class VeiculoListComponent implements OnInit {
  // entidade no plural
  veiculos: any = []
  // colunas exibidas na tabela e sua ordem
  displayedColumns: string[] = ['marca', 'nome', 'ano', 'placa', 'cliente', 'editar', 'excluir']

  constructor(
    private veiculoSrv: VeiculoService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.veiculos = await this.veiculoSrv.listar()
    console.log(this.veiculos)
  }

  async excluir(id: string) {
    if(confirm('Deseja realmente excluir?')){
      try {
        await this.veiculoSrv.excluir(id)
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
