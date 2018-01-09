import { Component, OnInit, Injectable } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
  
})
@Injectable()
export class MenuComponent implements OnInit {

  opcao: number;
  homeCartoes: boolean;
  aplicativo: string;
  fileMenu: Object[];
  
  ngOnInit() {
    console.log(`construtor do MenuComponent`);
  }

  watch($event) {
    debugger;
    this.homeCartoes = $event.homeCartoes;
    this.opcao = $event.opcao;
    this.aplicativo = $event.aplicativo;
    this.fileMenu = $event.fileMenu;
  }

  hiddenCadastro(){
    if(this.opcao!==undefined || this.homeCartoes===false){
      return false;
    }
    return true;
  }

}
