import { Injectable } from '@angular/core';
import { IntrumentModel} from './../models/index';
import { of, Observable,from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

  public getParamsObserve(Intruments): Observable<IntrumentModel> {
    return new Observable<IntrumentModel>(observer => observer.next(Intruments));
  }


}
