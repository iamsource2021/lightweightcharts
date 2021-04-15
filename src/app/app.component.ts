import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'lightweightcharts';

  params:any[];

  getParams(){
    this.params = [
      {
        event: {},
        eventname:'createChartEvent'
      },
      {
        event: {price:61,title:"Limit"},
        eventname:'createPriceLine'
      },
      {
        event: {price:58,title:"Open"},
        eventname:'createPriceLine'
      },
      {
        event: {price:56,title:"Stop"},
        eventname:'createPriceLine'
      },
      {
        event: {},
        eventname: 'setIntervalmergeTickToBarEvent'
      },
      // {
      //   event: {
      //     "open": 55.639871972198634,
      //     "high": 59.559596405601496,
      //     "low": 55.639871972198634,
      //     "close": 56.557343587519235,
      //     "time": {
      //         "year": 2019,
      //         "month": 6,
      //         "day": 1
      //     }
      //   },
      //   eventname: 'mergeTickToBarEvent'
      // },
      // {
      //   event: {
      //     "open": 65.639871972198634,
      //     "high": 69.559596405601496,
      //     "low": 65.639871972198634,
      //     "close": 66.557343587519235,
      //     "time": {
      //         "year": 2019,
      //         "month": 6,
      //         "day": 2
      //     }
      //   },
      //   eventname: 'mergeTickToBarEvent'
      // }
    ]
    return this.params;
  }
}
