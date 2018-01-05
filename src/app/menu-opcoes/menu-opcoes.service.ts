import { Injectable } from "@angular/core";


@Injectable()
export class MenuOpcoesService {

    aplicativo: string;

    constructor(){}

    guardarAplicativo(_aplicativo: string) {
        this.aplicativo = _aplicativo;

    }

    recuperarAplicativo(): string {
        return this.aplicativo;
    }


}