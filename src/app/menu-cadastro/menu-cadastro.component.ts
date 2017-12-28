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
    debugger;
    let filhos: Filho[] = this.menuCommponent.fileMenu[this.menuCommponent.aplicativo]["filhos"];
    filhos.push(this.filho);
    this.menuCommponent.fileMenu[this.menuCommponent.aplicativo]["filhos"] = filhos;
    console.log(this.menuCommponent.fileMenu);
  }

  varrerMenu() {
    for (var i = 0; i < 100; i++) {
      var key = Object.keys(this.menuCommponent.fileMenu)[i];
      if (key !== undefined) {

        if (key === this.menuCommponent.aplicativo && key !== "mobileitaucard.home-mobile-cartoes") {
          this.varrerAplicativo(this.menuCommponent.fileMenu[key]);
          break;
        }
        if (key === this.menuCommponent.aplicativo && key === "mobileitaucard.home-mobile-cartoes") {
          this.varrerAplicativoCartoes(this.menuCommponent.fileMenu[key]);
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

  downloadFile(data: FileList){
    var blob = new Blob([data], { type: 'json' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
