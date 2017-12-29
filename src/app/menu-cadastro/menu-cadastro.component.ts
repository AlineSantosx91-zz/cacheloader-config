import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Filho } from './../common/model/menu-filho-model';
import { MenuComponent } from './../menu/menu.component';
import { MenuCadastroService } from './menu-cadastro.service';


@Component({
  selector: 'app-menu-cadastro',
  templateUrl: './menu-cadastro.component.html',
  styleUrls: ['./menu-cadastro.component.css'],
  providers: [MenuCadastroService]

})
export class MenuCadastroComponent implements OnInit {

  mensagens: string[]
  error: boolean;
  filho: Filho;
  stringRegras: string;
  menuCadastroService: MenuCadastroService

  constructor(private router: Router,
    private menuComponent: MenuComponent,
    _menuCadastroService: MenuCadastroService) {
    this.filho = new Filho();
    this.filho.ativo = true;
    this.filho.subMenu = false;
    this.menuCadastroService = _menuCadastroService;
  }

  ngOnInit() {
  }


  cadastrarMenu() {

    this.mensagens = new Array;
    this.error = false;

    if (this.menuComponent.aplicativo == null || this.menuComponent.aplicativo == undefined) {
      this.mensagens.push("Selecione um aplicativo");
      this.error = true;
      return;
    }

    if (this.menuCadastroService.isHomeCartoes()) {
      this.adicionaFilhosHomeCartoes()
    } else {
      this.adicionaFilhosOutrasHomes()
    }

    this.menuCadastroService.downloadFile(this.menuComponent.fileMenu);
  }

  // populaDadosNovoFilho() {

  //   let filhos: Filho[] = this.menuCadastroService.retornaFilhosDoAplicativoSelecionado();
  //   let ordens = this.menuCadastroService.obterNumerosDeOrdem(filhos);
  //   this.filho.ordem = this.menuCadastroService.retornaProximoNumeroMaior(ordens);
  //   this.filho.uidPai = filhos[0].uidPai;
  //   this.filho.uid = this.menuCadastroService.gerarUid();
  //   this.filho.regras = this.menuCadastroService.converterRegrasStringToArray(this.stringRegras);

  // }




  adicionaFilhosHomeCartoes() {

    let filhos: Filho[] = this.menuComponent.fileMenu[this.menuComponent.aplicativo]["filhos"];


    if (this.menuComponent.opcao === 1) {

      filhos.forEach(filho => {
        if (filho.chaveMobile === "publico") {
          this.setarFilhoNoPaiHomeCartoes(filho, filhos);
        }
      });

    } else {

      filhos.forEach(filho => {
        if (filho.chaveMobile === "privado") {
          this.setarFilhoNoPaiHomeCartoes(filho, filhos);
        }
      });
    }
  }

  setarFilhoNoPaiHomeCartoes(filho: Filho, filhos: Filho[]) {

    let ordens = this.menuCadastroService.obterNumerosDeOrdem(filho.filhos);
    this.filho.ordem = this.menuCadastroService.retornaProximoNumeroMaior(ordens);
    this.filho.uidPai = filhos[0].uidPai;
    this.filho.uid = this.menuCadastroService.gerarUid();
    this.filho.regras = this.menuCadastroService.converterRegrasStringToArray(this.stringRegras);

    filho.filhos.push(this.filho);
    this.menuComponent.fileMenu[this.menuComponent.aplicativo]["filhos"] = filhos;
    return;
  }

  adicionaFilhosOutrasHomes() {
    let filhos: Filho[] = this.menuComponent.fileMenu[this.menuComponent.aplicativo]["filhos"];

    let ordens = this.menuCadastroService.obterNumerosDeOrdem(filhos);
    this.filho.ordem = this.menuCadastroService.retornaProximoNumeroMaior(ordens);
    this.filho.uidPai = filhos[0].uidPai;
    this.filho.uid = this.menuCadastroService.gerarUid();
    this.filho.regras = this.menuCadastroService.converterRegrasStringToArray(this.stringRegras);

    filhos.push(this.filho);
    this.menuComponent.fileMenu[this.menuComponent.aplicativo]["filhos"] = filhos;
  }

}
