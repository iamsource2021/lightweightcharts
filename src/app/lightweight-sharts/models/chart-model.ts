import { CrosshairMode } from 'lightweight-charts';

export class ChartModel implements Chart{
  public CWidth = document.documentElement.clientWidth;
  public width = this.CWidth-(this.CWidth*.125);

  public Cheight = document.documentElement.clientHeight;
  public height = this.Cheight - (this.Cheight*.657);


  public layout = {
    backgroundColor: '#131722',
    textColor: 'rgba(255, 255, 255, 0.9)',
  };

  public grid = {
    vertLines: {
      color: 'rgba(255,255,255,.19)',
    },
    horzLines: {
      color: 'rgba(255,255,255,.19)',
    },
  };

  public crosshair= {
    mode: CrosshairMode.Normal,
  };

  public localization= {
    priceFormatter: price => parseFloat(price).toFixed(2)
  };

  public priceScale = {
    borderColor: 'rgba(255,255,255,.19)'
  };

  public timeScale = {
    borderColor: 'rgba(255,255,255,.19)'
  };

  public querySelectorEvent = "body > app-root > lightweight-sharts";

  public getParams(){
    return {
      width: this.width,
      height: this.height,
      layout: this.layout,
      grid: this.grid,
      crosshair: this.crosshair,
      priceScale: this.priceScale,
      timeScale: this.timeScale,
      localization: this.localization
    }
  }

  public setParams(params){
    this.width = typeof params.width==='undefined'?this.width: params.width;
    this.height = typeof params.height==='undefined'?this.height:params.height;
    this.layout = typeof params.layout==='undefined'?this.layout:params.layout;
    this.grid = typeof params.grid==='undefined'?this.grid:params.grid;
    this.crosshair = typeof params.crosshair==='undefined'?this.crosshair:params.crosshair;
    this.priceScale = typeof params.priceScale==='undefined'?this.priceScale:params.priceScale;
    this.timeScale = typeof params.timeScale==='undefined'?this.timeScale:params.timeScal;
    this.localization = typeof params.localization==='undefined'?this.localization:params.localization;
    this.querySelectorEvent = typeof params.querySelectorEvent==='undefined'?this.querySelectorEvent:params.querySelectorEvent;
  }
}

export interface Chart {
  width: number;
  height: number;
  layout: object;
  grid: object;
  crosshair: object;
  localization: object;
  priceScale:object;
}
