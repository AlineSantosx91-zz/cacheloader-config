import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';

import { FileUploader } from 'ng2-file-upload';
import { ModalDialogComponent } from './../common/modal-dialog/modal-dialog.component';

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

  constructor(private router: Router) {
    this.appCombobox = false;
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

    if (this.aplicativo == null || this.aplicativo == undefined) {
      this.mensagens.push("Selecione um aplicativo");
      this.error = true;
      return;
    }

    this.varrerMenu();
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
          let filhos = new Array;
          filhos = aplicativoMenu[key];
          this.obterNumerosDeOrdem(filhos);
          break;
        }
      }
    }
  }

  varrerAplicativoCartoes(aplicativoMenu: string) {

  }

  obterNumerosDeOrdem(filhos: Array<String>) {
    debugger;
    let ordens = new Array;

    //Todo criar um model de Filho
  
    for (var i = 0; i < 100; i++) {
      var filho = filhos[i];
      var key = Object.keys(filho)[i];
      if (key !== undefined) {
        debugger;
        if (key === "ordem") {
          ordens.push(filhos[key]);
        }
      }
    }

    this.retornaProximoNumeroMaior(ordens);
    
  }

  retornaProximoNumeroMaior(ordens: Array<Number>) {
    debugger;

    console.log(ordens);

  }
}
