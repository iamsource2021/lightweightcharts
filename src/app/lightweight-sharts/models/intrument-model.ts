export class IntrumentModel implements Intrument{
  public open= 0;
  public high= 0;
  public low= 0;
  public close = 0;
  public time={};
  public symbol= '';

  public getParams(){
    return {
      open: this.open,
      high: this.high,
      low: this.low,
      close: this.close,
      time: this.time,
      symbol: this.symbol
    }
  }

  public setParams(params){
    this.open = params.open;
    this.high = typeof params.high==='undefined'?this.high:params.high;
    this.low = typeof params.low==='undefined'?this.low:params.low;
    this.close = typeof params.close==='undefined'?this.close:params.close;
    this.time = typeof params.time==='undefined'?this.time:params.time;
    this.symbol = typeof params.symbol==='undefined'?this.symbol:params.symbol;
  }
}

export interface Intrument{
  open: number;
  high: number;
  low: number;
  close: number;
  time: object;
  symbol: string;
}
