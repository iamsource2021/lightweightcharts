import { Injectable } from '@angular/core';
import { IntrumentModel,Intrument} from './../models/index';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private dataSource = new BehaviorSubject<IntrumentModel>(new IntrumentModel);

  data:Observable<IntrumentModel> = this.dataSource.asObservable();

  updatedDataSelection(data: IntrumentModel){
    this.dataSource.next(data);
  }
}
