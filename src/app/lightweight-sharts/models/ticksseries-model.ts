import * as moment from 'moment';

export class TicksseriesModel implements Ticksseries{
  public time = 0;
  public open = null;
  public high = 0;
  public low = 0;
  public close = 0;
  public intervals = '1MIN'; //available
  public price=0;
  public lastRange= null;

  public getInterval(interval:string,ticks){
    this.intervals = interval;
    let timestampTruncate = this.getRange(ticks.time,interval);
    let price = Math.round((ticks.open + ticks.close)/2); //latest price
    let newRange;

    if(this.hasNewRange(price,timestampTruncate)){
      this.open = price;
      newRange = {
        time: timestampTruncate,
        open: price,
        high: ticks.high,
        low: ticks.low,
        close: price
      }
      this.high = newRange.high;
      this.low = newRange.low;
    }else{
      newRange = {
        time: timestampTruncate,
        open: this.open,
        high: Math.max(this.high,ticks.high),
        low: Math.max(this.low,ticks.low),
        close: price
      }
      // console.log(newRange);
    }
    return newRange;
  }

  private getRange(time,range='1MIN'){
    let d = new Date(parseInt(time));
    let rangeInt;
    let newtime
    switch(range){
      case '1MIN':
      newtime = d.setSeconds(0,0);
      rangeInt = moment(newtime).minute();
      break;
      default: break;
    }
    return newtime;
  }

  private hasNewRange(price,rangeInt){
    let isNewRange = false;
    if(this.lastRange!==rangeInt){
      this.lastRange = rangeInt;
      // console.log('new range:',this.lastRange);
      isNewRange = true;
    }else{
      this.lastRange = rangeInt;
      // console.log('range:',this.lastRange);
      isNewRange = false;
    }
    return isNewRange;
  }
}

export interface Ticksseries{
  open:number;
  high:number;
  low:number;
  close:number;
  time: number;
}
