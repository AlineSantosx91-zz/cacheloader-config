import { MenuOpcoesComponent } from './../menu-opcoes/menu-opcoes.component';
import { Injectable } from '@angular/core';

import { Filho } from './../common/model/menu-filho-model';


@Injectable()
export class MenuCadastroService {

    constructor(private menuOpcoesComponent: MenuOpcoesComponent) { }

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
        if(stringRegras !== undefined){
            return stringRegras.split(",");
        }
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
        
        if (this.menuOpcoesComponent.aplicativo === "mobileitaucard.home-mobile-cartoes") {
            return true;
        }
        return false;
    }
}
