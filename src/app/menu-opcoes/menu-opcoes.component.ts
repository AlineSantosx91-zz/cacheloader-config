import { element } from 'protractor';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { FileUploader } from 'ng2-file-upload';
import { ModalDialogComponent } from './../common/modal-dialog/modal-dialog.component';
import { Filho } from './../common/model/menu-filho-model';
import { MenuOpcoesService } from './menu-opcoes.service';

@Component({
  selector: 'app-menu-opcoes',
  templateUrl: './menu-opcoes.component.html',
  styleUrls: ['./menu-opcoes.component.css'],
  providers: [ MenuOpcoesService]
})
@Injectable()
export class MenuOpcoesComponent implements OnInit {

  files: FileList;
  fileMenu: Object[];
  aplicativos: string[];
  appCombobox: boolean;
  appRadioButton: boolean;
  aplicativo: string;
  opcao: number;
  homeCartoes: boolean;
  menuOpcoesService: MenuOpcoesService;
  @Output() onChangeAplicativo = new EventEmitter();

  constructor(private router: Router, _menuOpcoesService: MenuOpcoesService) {
    console.log(this.aplicativo);
    this.menuOpcoesService = _menuOpcoesService;
    debugger;
  }

  ngOnInit() {
    debugger;
    this.appCombobox = false;
    this.homeCartoes = undefined;
  }

  uploadFile(event) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);

  }

  _handleReaderLoaded(readerEvt) {
    this.fileMenu = Object.assign(new Object(), JSON.parse(readerEvt.target.result));
    this.criarListaAplicativos();
  }

  criarListaAplicativos() {
    this.aplicativos = new Array;

    for (let i = 0; i < 100; i++) {
      const key = Object.keys(this.fileMenu)[i];
      if (key !== undefined) {
        this.aplicativos.push(key);
      }
    }

    if (this.aplicativos.length > 0) {
      this.appCombobox = true;
    }
  }

  setAplicativo(aplicativo: string ) {
    debugger;

    this.opcao = undefined;
    this.aplicativo = aplicativo;
    if (this.aplicativo === 'mobileitaucard.home-mobile-cartoes') {
      this.appRadioButton = true;
      this.homeCartoes = true;
    } else {
      this.appRadioButton = false;
      this.homeCartoes = false;
    }

    this.menuOpcoesService.guardarAplicativo(this.aplicativo);

    this.onChangeAplicativo.emit({
      homeCartoes: this.homeCartoes,
      opcao: this.opcao
    });
  }

  setOpcao(_opcao: number){
   debugger;
    this.opcao = _opcao;
    this.onChangeAplicativo.emit({
      homeCartoes: this.homeCartoes,
      opcao: this.opcao
    });

  }

  public getAplicativo(): string {
    return this.aplicativo;
  }

  limparCampos() {
    this.files = undefined;
    this.fileMenu = undefined;
    this.aplicativos = Array<string>();
    this.appCombobox = false;
    this.appRadioButton = false;
    this.aplicativo = '';
    this.opcao = undefined;
    this.homeCartoes = undefined;
  }
}
