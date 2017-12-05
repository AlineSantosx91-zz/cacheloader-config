import { MenuService } from './menu.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuFile: Object[];

  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
  }

  myFunc() {

    let pathFile: string = "file:/home/aline/dev/workspaces/backend-geral/business/mobile-teste-integrado/server/env/menu.json"

    this.menuService.getMenuFile(pathFile)
      .subscribe((data: Object[]) => { this.menuFile = data },
      error => console.log(error),
      () => console.log("complete", this.menuFile));

  }
}
