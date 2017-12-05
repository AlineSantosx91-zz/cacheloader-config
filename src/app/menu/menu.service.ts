import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';


@Injectable()
export class MenuService {

  constructor(public http:Http) { }

  public getMenuFile(path: string): Observable<Object[]> {
    return this.http.get(path)
        .map((response: Response) => <Object[]>response.json());
}

}
