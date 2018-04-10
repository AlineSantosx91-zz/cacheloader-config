import { Injectable, EventEmitter } from "@angular/core";


@Injectable()
export class AlertsService {

    static emitirFallback = new EventEmitter<Object>();    

    constructor(){}


}