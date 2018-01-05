import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Filho } from './../common/model/menu-filho-model';
import { MenuCadastroService } from './menu-cadastro.service';
import { MenuOpcoesComponent } from './../menu-opcoes/menu-opcoes.component';
import { AlertsComponent } from './../common/alerts/alerts.component';
import { element } from 'protractor';


@Component({
  selector: 'app-menu-cadastro',
  templateUrl: './menu-cadastro.component.html',
  styleUrls: ['./menu-cadastro.component.css'],
  providers: [MenuCadastroService, AlertsComponent, MenuOpcoesComponent]

})
export class MenuCadastroComponent implements OnInit {

  filho: Filho;
  stringRegras: string;
  menuCadastroService: MenuCadastroService
  // alertsComponent: AlertsComponent
  menuOpcoesComponent: MenuOpcoesComponent;

  constructor(private router: Router,
    _menuOpcoesComponent: MenuOpcoesComponent,
    _menuCadastroService: MenuCadastroService,
    private alertsComponent: AlertsComponent) {
    this.filho = new Filho();
    this.filho.ativo = true;
    this.filho.subMenu = false;
    this.menuCadastroService = _menuCadastroService;
    this.menuOpcoesComponent = _menuOpcoesComponent;
  }

  ngOnInit() {
    // this.alertsComponent.setError(true);
  }


  cadastrarMenu() {
    debugger;

    this.alertsComponent.mensagens = new Array;
    this.alertsComponent.error = false;
    this.alertsComponent.success = false;
    console.log(this.menuOpcoesComponent.getAplicativo());
    if (this.menuOpcoesComponent.getAplicativo() == null || this.menuOpcoesComponent.aplicativo == undefined) {
      this.alertsComponent.setMessage("Selecione um aplicativo");
      this.alertsComponent.setError(true);
      return;
    }

    if (this.menuCadastroService.isHomeCartoes()) {
      this.adicionaFilhosHomeCartoes()
    } else {
      this.setarFilhoNoPaiOutrasHomes()
    }

    this.menuCadastroService.downloadFile(this.menuOpcoesComponent.fileMenu);
    this.alertsComponent.setMessage("Cadastro realizado com sucesso");
    this.alertsComponent.setSuccess(true);
    console.log(this.alertsComponent.success);
    // this.limparCampos();
  }

  adicionaFilhosHomeCartoes() {

    let filhos: Filho[] = this.menuOpcoesComponent.fileMenu[this.menuOpcoesComponent.aplicativo]["filhos"];

    if (this.menuOpcoesComponent.opcao === 1) {

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
    this.menuOpcoesComponent.fileMenu[this.menuOpcoesComponent.aplicativo]["filhos"] = filhos;
    return;
  }

  setarFilhoNoPaiOutrasHomes() {
    let filhos: Filho[] = this.menuOpcoesComponent.fileMenu[this.menuOpcoesComponent.aplicativo]["filhos"];

    let ordens = this.menuCadastroService.obterNumerosDeOrdem(filhos);
    this.filho.ordem = this.menuCadastroService.retornaProximoNumeroMaior(ordens);
    this.filho.uidPai = filhos[0].uidPai;
    this.filho.uid = this.menuCadastroService.gerarUid();
    this.filho.regras = this.menuCadastroService.converterRegrasStringToArray(this.stringRegras);

    filhos.push(this.filho);
    this.menuOpcoesComponent.fileMenu[this.menuOpcoesComponent.aplicativo]["filhos"] = filhos;
  }

  limparCampos(){
    // this.alertsComponent.error = false;
    this.filho = new Filho();
    this.stringRegras= "";
    this.menuOpcoesComponent.limparCampos();
  }

}
