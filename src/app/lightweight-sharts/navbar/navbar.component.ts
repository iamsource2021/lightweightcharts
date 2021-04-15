import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  @Input() symbol:string;

  @Input() price:number;

  constructor() { }

  ngOnInit(): void { }

  Comprar(symbol,open){
    console.log(symbol,open);
  }

  Vender(symbol,open){
    console.log(symbol,open);
  }

  Close(symbol,open){
    console.log(symbol,open);
  }
}
