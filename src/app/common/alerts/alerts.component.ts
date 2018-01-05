import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
@Injectable()
export class AlertsComponent implements OnInit {

  mensagens: string[]
  error: boolean;
  success: boolean;

  constructor() { }

  ngOnInit() {
  }

  setMessage(msg: string){

    if(this.mensagens == undefined || this.mensagens == null){
      this.mensagens = new Array<string>()
    }

    this.mensagens.push(msg)

  }

  setSuccess(success: boolean){
    debugger;
    this.success = success;
  }

  setError(error: boolean){
    this.error = error;
  }

}
