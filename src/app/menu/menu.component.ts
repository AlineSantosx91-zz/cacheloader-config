import { Component, OnInit, Injectable } from '@angular/core';
import { MenuDados } from "../common/model/menu-dados-model";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
  
})

@Injectable()
export class MenuComponent implements OnInit {


  
  ngOnInit() {
    console.log(`construtor do MenuComponent`);
  }

  menuDados = new MenuDados();

  watch($event) {
    console.log("watch event");    
    
    debugger;
    this.menuDados.homeCartoes = $event.homeCartoes;
    this.menuDados.opcao = $event.opcao;
    this.menuDados.aplicativo = $event.aplicativo;
    this.menuDados.fileMenu = $event.fileMenu;
  }

  hiddenCadastro(){
    if(this.menuDados.opcao!==undefined || this.menuDados.homeCartoes===false){
      return false;
    }
    return true;
  }
  

}
