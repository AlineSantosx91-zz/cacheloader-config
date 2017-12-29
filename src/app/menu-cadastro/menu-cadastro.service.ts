import { MenuComponent } from './../menu/menu.component';
import { Injectable } from '@angular/core';

import { Filho } from './../common/model/menu-filho-model';


@Injectable()
export class MenuCadastroService {

    // homeCartoes: boolean;

    constructor(private menuComponent: MenuComponent) { }


    // retornaFilhosDoAplicativoSelecionado() {
    //     for (var i = 0; i < 100; i++) {
    //         var key = Object.keys(this.menuComponent.fileMenu)[i];
    //         if (key !== undefined) {

    //             if (key === this.menuComponent.aplicativo && key !== "mobileitaucard.home-mobile-cartoes") {
    //                 this.homeCartoes = false;
    //                 // return this.retornaFilhoOutroAplicativo(this.menuComponent.fileMenu[key]);

    //             }
    //             if (key === this.menuComponent.aplicativo && key === "mobileitaucard.home-mobile-cartoes") {
    //                 // this.retornaFilhoAplicativoCartoes(this.menuComponent.fileMenu[key]);
    //                 this.homeCartoes = true;
    //                 break;
    //             }
    //         }
    //     }
    // }

    // retornaFilhoOutroAplicativo(aplicativoMenu: string) {
    //     for (var i = 0; i < 100; i++) {
    //         var key = Object.keys(aplicativoMenu)[i];
    //         if (key !== undefined) {
    //             if (key === "filhos") {
    //                 let filhos: Filho[] = aplicativoMenu[key];
    //                 return filhos;
    //             }
    //         }
    //     }
    // }


    // retornaFilhoAplicativoCartoes(aplicativoMenu: string) {

    //     for (var i = 0; i < 100; i++) {
    //         var key = Object.keys(aplicativoMenu)[i];
    //         if (key !== undefined) {
    //             if (key === "filhos") {
    //                 let filhos1: Filho[] = aplicativoMenu[key];
    //                 let filhos2: Filho[] = new Array;

    //                 if (this.menuComponent.opcao === 1) {
    //                     filhos1.forEach(element => {
    //                         if (element.chaveMobile === "publico") {
    //                             filhos2 = element[key]
    //                         }
    //                     });

    //                 } else if (this.menuComponent.opcao === 2) {
    //                     filhos1.forEach(element => {
    //                         if (element.chaveMobile === "privado") {
    //                             filhos2 = element[key]
    //                         }
    //                     });
    //                 } 

    //                 return filhos2;
    //             }
    //         }
    //     }
    // }


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

    converterRegrasStringToArray(stringRegras: string): Array<string> {
        return stringRegras.split(",");
    }

    downloadFile(data: any) {

        const blob: Blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const fileName: string = 'menu.json';
        const objectUrl: string = URL.createObjectURL(blob);

        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
    }


    isHomeCartoes(): boolean {
        if (this.menuComponent.aplicativo === "mobileitaucard.home-mobile-cartoes") {
            return true;
        }
        return false;
        // return this.homeCartoes;
    }


}
