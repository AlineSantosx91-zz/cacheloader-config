//import { MenuOpcoesComponent } from './../menu-opcoes/menu-opcoes.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']//,
  //providers: [MenuOpcoesComponent]
  
})
export class MenuComponent implements OnInit {

  opcao: number;
  homeCartoes: boolean;

  ngOnInit() {
    console.log(`xuxuxuxux`);
  }

  watch($event) {
    this.homeCartoes = $event.homeCartoes;
    this.opcao = $event.opcao;
  }

}
