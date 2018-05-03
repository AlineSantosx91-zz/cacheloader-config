import { Component, OnInit, Injectable, Input, EventEmitter } from '@angular/core';
import { AlertsService } from './alerts.service';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [AlertsService]
  
})
@Injectable()
export class AlertsComponent implements OnInit {

  mensagens: string[]
  error: boolean;
  success: boolean;

  constructor() { }

  ngOnInit() {
    // this.error = false;
    // this.success = false;
    
    AlertsService.emitirFallback.subscribe(
      data => this.setarResposta(data)
    );
  }

  ngOnDestroy() {
    AlertsService.emitirFallback.unsubscribe();
  }

  setarResposta(data: any){

    this.error = false;
    this.success = false;

    this.mensagens = new Array<string>();
    this.mensagens.push(data.message);

    if(data.status === 'success'){
      this.success = true;
    }

    if(data.status === 'error'){
      this.error = true;
    }

  }

}
