import { Injectable, EventEmitter } from "@angular/core";


@Injectable()
export class AlertsService {

    static emitirMensagemError = new EventEmitter<String>();
    static emitirMensagemSuccess = new EventEmitter<String>();
    

    constructor(){}

    setMessageError(message: String){
        // this.emitirMensagem.emit(message);
    }

    setMessageSucces(){

    }


}