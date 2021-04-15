import { timestamp } from 'rxjs/operators';
import { priceData } from './../data/priceData';
import * as moment from 'moment';

export class TicksModel implements Ticks{

  public lastClose = 0;

  public lastIndex = 0;

  public targetIndex = 0;

  public targetPrice = 0;

  public currentIndex = 0 ;

  public currentBusinessDay = 1529884800;

  public ticksInCurrentBar = 0;

  public currentBar = {
      open: null,
      high: null,
      low: null,
      close: null,
      time: this.currentBusinessDay,
  }

  public noisedPrice=0;

  public reset(callback) {
    callback(priceData);
    this.lastClose = priceData[priceData.length - 1].close
    this.lastIndex = priceData.length - 1

    this.targetIndex = this.lastIndex + 5 + Math.round(Math.random() + 30)
    this.targetPrice = this.getRandomPrice()

    this.currentIndex = this.lastIndex + 1
    this.currentBusinessDay = 1529884800;
    this.ticksInCurrentBar = 0
  }

  public mergeTickToBar(callback) {
      let deltaY = this.targetPrice - this.lastClose;
      let deltaX = this.targetIndex - this.lastIndex;
      let angle = deltaY / deltaX;
      let basePrice = this.lastClose + (this.currentIndex - this.lastIndex) * angle;
      let noise = (0.1 - Math.random() * 0.2) + 1.0;
      this.noisedPrice  = basePrice * noise;

      if (this.currentBar.open === null) {
        this.currentBar.open = this.noisedPrice
        this.currentBar.high = this.noisedPrice
        this.currentBar.low = this.noisedPrice
        this.currentBar.close = this.noisedPrice
      } else {
        this.currentBar.close = this.noisedPrice
        this.currentBar.high = Math.max(this.currentBar.high, this.noisedPrice)
        this.currentBar.low = Math.min(this.currentBar.low, this.noisedPrice)
      }

      callback(this.currentBar);
  }

  public stockTickToBar(data,callback) {
      this.currentBar.open = parseFloat(data.Rates[0]);
      this.currentBar.high = parseFloat(data.Rates[4]);
      this.currentBar.low = parseFloat(data.Rates[5]);
      this.currentBar.close = parseFloat(data.Rates[0]);
    callback(this.currentBar);
  }

  public nextBusinessDay(time) {
    let d = new Date()
    d.setUTCFullYear(time.year)
    d.setUTCMonth(time.month - 1)
    d.setUTCDate(time.day + 1)
    d.setUTCHours(0, 0, 0, 0)
    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
    }
  }

  public nextMin(time) {
    let d = new Date(parseInt(time));
    d.setSeconds(0,0);
    return moment(d.toISOString()).unix();
  }

  public timestamptoISO(time){
    let d = new Date(parseInt(time));
    d.setSeconds(0,0);
    return moment(d.toISOString()).unix();
  }

  public init(){
    this.lastClose = priceData[priceData.length - 1].close;
    this.lastIndex = priceData.length - 1;

    this.targetIndex = this.lastIndex + 105 + Math.round(Math.random() + 30);
    this.targetPrice = this.getRandomPrice();

    this.currentIndex = this.lastIndex + 1;
    this.currentBusinessDay = 1529884800;
    this.ticksInCurrentBar = 0;
    this.currentBar = {
      open: null,
      high: null,
      low: null,
      close: null,
      time: this.currentBusinessDay,
    }
  }

  public deserialize(){
    return this;
  }

  public getRandomPrice() {
    return 10 + Math.round(Math.random() * 10000) / 100
  }
}

export interface Ticks{
    lastClose:number;
    lastIndex:number;
    targetIndex:number;
    targetPrice:number;
    currentIndex:number;
    currentBusinessDay:any;
    ticksInCurrentBar:number;
    currentBar: Currentbar;
}

export interface Currentbar{
    open:number;
    high:number;
    low:number;
    close:number;
    time: number;
}

// export interface CurrentBusinessday{
//   day:number;
//   month:number;
//   year:number;
// }
