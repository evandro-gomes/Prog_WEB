import { ClienteService } from './../../cliente/cliente.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeiculoService } from './../veiculo.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.scss']
})
export class VeiculoFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  veiculo: any = {} // objeto vazio com nome no singular

  title: string = 'Novo veiculo'

  // Variáveis para armazenar as listagens de objetos relacionados
  clientes: any = []  //Vetor vazio, nome no PLURAL

  constructor(
    private veiculoSrv: VeiculoService,
    // Services das entidades relacionadas
    private clienteSrv: ClienteService,
    private snackBar: MatSnackBar,
    private location: Location,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    // Verifica se existe o parâmetro id na URL
    if(this.actRoute.snapshot.params['id']){
      try{
        // 1. Acionar o back-end para buscar registro e disponibilizá-lo para edição
        this.veiculo = await this.veiculoSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2. Mudar o título da página
        this.title = 'Editando veiculo'
      }
      catch(erro){
        console.log(erro)
        this.snackBar.open('ERRO: falha ao carregar dados para edição', 'Entendi',
          {duration: 5000})
      }
    }
    // Carrega as listagens das listagens relacionadas
    this.carregarDados()
  }

  async carregarDados(){
    try{
      this.clientes = await this.clienteSrv.listar()
    }
    catch(erro){
      console.log(erro)
      this.snackBar.open(`ERRO: não foi possível carregar todos os
       dados necessários para a página.`, 'Entendi', {duration: 5000})
    }
  }

  async salvar(form: NgForm){
    if(form.valid){
      try{
        // 1. Salvar os dados no back-end
        // Se o veiculo já existir (caso de edição),  ele já terá o atributo _id
        if(this.veiculo._id){
          await this.veiculoSrv.atualizar(this.veiculo) // atualização
        }
        else {
          await this.veiculoSrv.novo(this.veiculo)
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
