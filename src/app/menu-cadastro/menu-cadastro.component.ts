import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Filho } from './../common/model/menu-filho-model';
import { MenuComponent } from './../menu/menu.component';


@Component({
  selector: 'app-menu-cadastro',
  templateUrl: './menu-cadastro.component.html',
  styleUrls: ['./menu-cadastro.component.css'],
})
export class MenuCadastroComponent implements OnInit {

  mensagens: string[]
  error: boolean;
  filho: Filho;
  stringRegras: string;
  menuCommponent: MenuComponent
  homeCartoes: boolean;


  constructor(private router: Router, menuComponent: MenuComponent) {
    this.filho = new Filho();
    this.filho.ativo = true;
    this.filho.subMenu = false;
    this.menuCommponent = menuComponent
  }

  ngOnInit() {
  }


  cadastrarMenu() {

    this.mensagens = new Array;
    this.error = false;

    if (this.menuCommponent.aplicativo == null || this.menuCommponent.aplicativo == undefined) {
      this.mensagens.push("Selecione um aplicativo");
      this.error = true;
      return;
    }

    this.varrerMenu();

    if (this.homeCartoes) {
      this.adicionaFilhosHomeCartoes()
    } else {
      this.adicionaFilhosOutrasHomes()
    }

    this.downloadFile(this.menuCommponent.fileMenu);
  }

  varrerMenu() {
    for (var i = 0; i < 100; i++) {
      var key = Object.keys(this.menuCommponent.fileMenu)[i];
      if (key !== undefined) {

        if (key === this.menuCommponent.aplicativo && key !== "mobileitaucard.home-mobile-cartoes") {
          this.varrerAplicativo(this.menuCommponent.fileMenu[key]);
          this.homeCartoes = false;
          break;
        }
        if (key === this.menuCommponent.aplicativo && key === "mobileitaucard.home-mobile-cartoes") {
          this.varrerAplicativoCartoes(this.menuCommponent.fileMenu[key]);
          this.homeCartoes = true;
          break;
        }
      }
    }
  }

  varrerAplicativo(aplicativoMenu: string) {
    for (var i = 0; i < 100; i++) {
      var key = Object.keys(aplicativoMenu)[i];
      if (key !== undefined) {
        if (key === "filhos") {
          let filhos: Filho[] = aplicativoMenu[key];
          let ordens = this.obterNumerosDeOrdem(filhos);
          this.filho.ordem = this.retornaProximoNumeroMaior(ordens);
          this.filho.uidPai = filhos[0].uidPai;
          this.filho.uid = this.gerarUid();
          this.filho.regras = this.converterRegrasStringToArray();
          break;
        }
      }
    }
  }

  varrerAplicativoCartoes(aplicativoMenu: string) {

    for (var i = 0; i < 100; i++) {
      var key = Object.keys(aplicativoMenu)[i];
      if (key !== undefined) {
        if (key === "filhos") {
          let filhos1: Filho[] = aplicativoMenu[key];
          let filhos2: Filho[] = new Array;

          if (this.menuCommponent.opcao === 1) {
            filhos1.forEach(element => {
              if (element.chaveMobile === "publico") {
                filhos2 = element[key]
              }
            });

          } else if (this.menuCommponent.opcao === 2) {
            filhos1.forEach(element => {
              if (element.chaveMobile === "privado") {
                filhos2 = element[key]
              }
            });
          } else {
            this.mensagens.push("Houve um erro, atualize a tela e tente novamente");
            this.error = true;
            return;
          }

          let ordens = this.obterNumerosDeOrdem(filhos2);
          this.filho.ordem = this.retornaProximoNumeroMaior(ordens);
          this.filho.uidPai = filhos1[0].uidPai;
          this.filho.uid = this.gerarUid();
          this.filho.regras = this.converterRegrasStringToArray();
          break;
        }
      }
    }
  }

  obterNumerosDeOrdem(filhos: Array<Filho>): Array<number> {

    let ordens = new Array;
    filhos.forEach(filho => {
      ordens.push(filho.ordem)
    });

    return ordens;
  }

  retornaProximoNumeroMaior(ordens: Array<number>): number {
    return Math.max(...ordens) + 1;
  }

  gerarUid(): string {

    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  converterRegrasStringToArray(): Array<string> {
    return this.stringRegras.split(",");
  }

  downloadFile(data: any) {

    const blob: Blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const fileName: string = 'menu.json';
    const objectUrl: string = URL.createObjectURL(blob);

    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  }

  adicionaFilhosHomeCartoes() {

    let filhos: Filho[] = this.menuCommponent.fileMenu[this.menuCommponent.aplicativo]["filhos"];

    if (this.menuCommponent.opcao === 1) {

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
    filho.filhos.push(this.filho);
    this.menuCommponent.fileMenu[this.menuCommponent.aplicativo]["filhos"] = filhos;
    return;
  }

  adicionaFilhosOutrasHomes() {
    let filhos: Filho[] = this.menuCommponent.fileMenu[this.menuCommponent.aplicativo]["filhos"];
    filhos.push(this.filho);
    this.menuCommponent.fileMenu[this.menuCommponent.aplicativo]["filhos"] = filhos;
  }

}
