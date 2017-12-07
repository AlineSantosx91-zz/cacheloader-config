import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';


@Injectable()
export class MenuService {

  constructor(public http:Http) { }

  uploadFile(file) {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
  
    // this.http.post(url, formData, request_options)
  }

}
