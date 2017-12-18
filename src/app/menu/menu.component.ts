import { element } from 'protractor';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';

import { FileUploader } from 'ng2-file-upload';
import { ModalDialogComponent } from './../common/modal-dialog/modal-dialog.component';
import { Filho } from './../common/model/menu-filho-model'

declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  files: FileList;
  fileMenu: Object[];
  aplicativos: string[];
  appCombobox: boolean;
  appRadioButton: boolean;
  opcao: number;
  teste: string;
  aplicativo: string;
  mensagens: string[]
  error: boolean;
  modalDialogComponent: ModalDialogComponent;
  filho: Filho;

  constructor(private router: Router) {
    this.appCombobox = false;
    this.filho = new Filho();
    this.filho.ativo = true;
    this.filho.subMenu = false;
  }

  ngOnInit() {
  }

  uploadFile(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);

  }

  _handleReaderLoaded(readerEvt) {
    this.fileMenu = new Array;
    this.fileMenu = Object.assign(new Object(), JSON.parse(readerEvt.target.result));
    this.criarListaAplicativos();
  }

  criarListaAplicativos() {
    this.aplicativos = new Array;

    for (var i = 0; i < 100; i++) {
      var key = Object.keys(this.fileMenu)[i];
      if (key !== undefined) {
        this.aplicativos.push(key);
        // var value = this.fileMenu[key]
      }
    }

    if (this.aplicativos.length > 0) {
      this.appCombobox = true;
    }
  }

  setAplicativo(aplicativo: string) {
    this.aplicativo = aplicativo;
    this.appRadioButton = true;

  }

  cadastrarMenu() {

    this.mensagens = new Array;
    this.error = false;
    // this.filho = new Filho();

    if (this.aplicativo == null || this.aplicativo == undefined) {
      this.mensagens.push("Selecione um aplicativo");
      this.error = true;
      return;
    }
    this.varrerMenu();
    console.log(this.filho);
  }

  varrerMenu() {
    for (var i = 0; i < 100; i++) {
      var key = Object.keys(this.fileMenu)[i];
      if (key !== undefined) {

        if (key === this.aplicativo && key !== "mobileitaucard.home-mobile-cartoes") {
          this.varrerAplicativo(this.fileMenu[key]);
          break;
        }
        if (key === this.aplicativo && key === "mobileitaucard.home-mobile-cartoes") {
          this.varrerAplicativoCartoes(this.fileMenu[key]);
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

  gerarUid(): string{

    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

}
