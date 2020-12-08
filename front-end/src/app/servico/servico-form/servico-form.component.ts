import { VeiculoService } from './../../veiculo/veiculo.service';
import { FuncionarioService } from './../../funcionario/funcionario.service';
import { PecaService } from './../../peca/peca.service';
import { ClienteService } from './../../cliente/cliente.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicoService } from './../servico.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.scss']
})
export class ServicoFormComponent implements OnInit {

  // Variável para armazenar os dados do registro
  servico: any = {} // objeto vazio com nome no singular

  title: string = 'Novo servico'

  // Variáveis para armazenar as listagens de objetos relacionados
  clientes: any = []  //Vetor vazio, nome no PLURAL
  funcionarios: any = []
  veiculos: any = []
  pecas: any = []

  constructor(
    private servicoSrv: ServicoService,
    // Services das entidades relacionadas
    private clienteSrv: ClienteService,
    private funcionarioSrv: FuncionarioService,
    private veiculoSrv: VeiculoService,
    private pecaSrv: PecaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private actRoute: ActivatedRoute
  ) { }

  async ngOnInit(){
    // Verifica se existe o parâmetro id na URL
    if(this.actRoute.snapshot.params['id']){
      try{
        // 1. Acionar o back-end para buscar registro e disponibilizá-lo para edição
        this.servico = await this.servicoSrv.obterUm(this.actRoute.snapshot.params['id'])
        // 2. Mudar o título da página
        this.title = 'Editando servico'
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
      this.funcionarios = await this.funcionarioSrv.listar()
      this.veiculos = await this.veiculoSrv.listar()
      this.pecas = await this.pecaSrv.listar()
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
        // Se o servico já existir (caso de edição),  ele já terá o atributo _id
        if(this.servico._id){
          await this.servicoSrv.atualizar(this.servico) // atualização
        }
        else {
          await this.servicoSrv.novo(this.servico)
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
