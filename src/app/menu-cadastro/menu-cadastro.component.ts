import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Filho } from './../common/model/menu-filho-model';
import { MenuCadastroService } from './menu-cadastro.service';
import { MenuOpcoesComponent } from './../menu-opcoes/menu-opcoes.component';
import { MenuOpcoesService } from '../menu-opcoes/menu-opcoes.service';
import { MenuDados } from "../common/model/menu-dados-model";
import { AlertsService } from './../common/alerts/alerts.service';


@Component({
  selector: 'app-menu-cadastro',
  templateUrl: './menu-cadastro.component.html',
  styleUrls: ['./menu-cadastro.component.css'],
  providers: [MenuCadastroService, MenuOpcoesComponent, MenuOpcoesService, AlertsService]

})
export class MenuCadastroComponent implements OnInit {

  filho: Filho;
  stringRegras: string;
  menuCadastroService: MenuCadastroService;
  menuOpcoesService: MenuOpcoesService;

  @Input() menuDados = new MenuDados();
  

  constructor(
    private router: Router,
    private menuOpcoesComponent: MenuOpcoesComponent,
    _menuCadastroService: MenuCadastroService,
    _menuOpcoesService: MenuOpcoesService,
    private alertsService : AlertsService) {

    this.filho = new Filho();
    this.filho.ativo = true;
    this.filho.subMenu = false;
    this.menuCadastroService = _menuCadastroService;
    this.menuOpcoesService = _menuOpcoesService;
  }

  ngOnInit() {
  }


  cadastrarMenu() {

    if (this.menuDados.aplicativo == null || this.menuDados.aplicativo == undefined) {
      AlertsService.emitirFallback.emit({message: 'Selecione um aplicativo', status: 'error'});
      return;
    }

    if (this.menuCadastroService.isHomeCartoes()) {
      this.adicionaFilhosHomeCartoes()
    } else {
      this.setarFilhoNoPaiOutrasHomes()
    }

    this.menuCadastroService.downloadFile(this.menuDados.fileMenu);
    AlertsService.emitirFallback.emit({message: 'Cadastro realizado com sucesso', status: 'success'});
    this.limparCampos();
  }

  private adicionaFilhosHomeCartoes() {

    let filhos: Filho[] = this.menuDados.fileMenu[this.menuDados.aplicativo]["filhos"];

    if (this.menuDados.opcao === 1) {

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

  private setarFilhoNoPaiHomeCartoes(filho: Filho, filhos: Filho[]) {

    let ordens = this.menuCadastroService.obterNumerosDeOrdem(filho.filhos);
    this.filho.ordem = this.menuCadastroService.retornaProximoNumeroMaior(ordens);
    this.filho.uidPai = filhos[0].uidPai;
    this.filho.uid = this.menuCadastroService.gerarUid();
    this.filho.regras = this.menuCadastroService.converterRegrasStringToArray(this.stringRegras);

    filho.filhos.push(this.filho);
    this.menuDados.fileMenu[this.menuDados.aplicativo]["filhos"] = filhos;
    return;
  }

 private setarFilhoNoPaiOutrasHomes() {

    let filhos: Filho[] = this.menuDados.fileMenu[this.menuDados.aplicativo]["filhos"];

    let ordens = this.menuCadastroService.obterNumerosDeOrdem(filhos);
    this.filho.ordem = this.menuCadastroService.retornaProximoNumeroMaior(ordens);
    this.filho.uidPai = filhos[0].uidPai;
    this.filho.uid = this.menuCadastroService.gerarUid();
    this.filho.regras = this.menuCadastroService.converterRegrasStringToArray(this.stringRegras);

    filhos.push(this.filho);
    this.menuDados.fileMenu[this.menuDados.aplicativo]["filhos"] = filhos;
  }

  private limparCampos(){
    this.filho = new Filho();
    this.stringRegras= "";
    this.menuDados = new MenuDados();
  }

}
