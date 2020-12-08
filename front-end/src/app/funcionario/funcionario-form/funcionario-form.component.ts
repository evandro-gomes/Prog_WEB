import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuncionarioService } from './../funcionario.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  funcionario: any = {} // objeto vazio com nome no singular

  title: string = 'Novo funcionario'

  constructor(
    private funcionarioSrv: FuncionarioService,
    private snackBar: MatSnackBar,
    private location: Location,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    // Verifica se existe o parâmetro id na URL
    if(this.actRoute.snapshot.params['id']){
      try{
        // 1. Acionar o back-end para buscar registro e disponibilizá-lo para edição
        this.funcionario = await this.funcionarioSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2. Mudar o título da página
        this.title = 'Editando funcionario'
      }
      catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: falha ao carregar dados para edição', 'Entendi',
          {duration: 5000})
      }
    }
  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        // 1. Salvar os dados no back-end
        // Se o funcionario já existir (caso de edição),  ele já terá o atributo _id
        if(this.funcionario._id){
          await this.funcionarioSrv.atualizar(this.funcionario) // atualização
        }
        else {
          await this.funcionarioSrv.novo(this.funcionario)
        }
          // 2. Dar o feddback para o usuario
        this.snackBar.open('Dados salvos com sucesso.', 'Entendi',
          {duration: 5000})
        // 3. Voltar ao componente de listagem 
        this.location.back()
      }
      catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
          {duration: 5000})
      }
    }
  }

  voltar(form: NgForm){
    let result = true
    // form.dirty = formulário sujo, não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched){
      result = confirm('Dados não salvos. Deseja realmente voltar?')
    }
    if(result) this.location.back()
  }

}
