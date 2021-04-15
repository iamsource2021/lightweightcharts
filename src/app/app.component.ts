import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'lightweightcharts';

  public paramsLightweightObservable: Observable<any[]>;

  constructor(){

  }

  ngOnInit() {
    this.getParams();
  }
  getParams(symbol='BTC/USD'){
    // let params = [
    //   {
    //     event: {
    //       querySelectorEvent:"#content > div.container-fluid.container-fluid-ghraph > div > div > div > div > lightweight-sharts"
    //     },
    //     eventname:'createChartEvent'
    //   },
    //   {
    //     event: {price:61,title:"Limit"},
    //     eventname:'createPriceLine'
    //   },
    //   {
    //     event: {price:58,title:"Open"},
    //     eventname:'createPriceLine'
    //   },
    //   {
    //     event: {price:56,title:"Stop"},
    //     eventname:'createPriceLine'
    //   },
    //   {
    //     event: {
    //       "symbol": symbol
    //     },
    //     eventname: 'mergeTickToBarEvent'
    //   }
    // ];

    this.paramsLightweightObservable = new Observable<any[]>((observer) => {
      let params = [
        {
          event: {
            querySelectorEvent:"body > app-root > lightweight-sharts"
          },
          eventname:'createChartEvent'
        },
        {
          event: {
            "symbol": symbol
          },
          eventname: 'mergeTickToBarEvent'
        }
      ];
      observer.next(params);
    });
  }
}
