import { LineStyle } from 'lightweight-charts';

export class PricelineModel implements Priceline{
  public price= 60;
  public color= '#be1238';
  public shape= 'arrowDown';
  public lineWidth= 1;
  public lineStyle= LineStyle.Solid;
  public axisLabelVisible= true;
  public title= 'minimum price x';

  public getParams(){
    return {
      price: this.price,
      color: this.color,
      shape: this.shape,
      lineWidth: this.lineWidth,
      lineStyle: this.lineStyle,
      axisLabelVisible: this.axisLabelVisible,
      title: this.title
    }
  }

  public setParams(params){
    this.price = params.price;
    this.color = typeof params.color==='undefined'?this.color:params.color;
    this.shape = typeof params.shape==='undefined'?this.shape:params.shap;
    this.lineWidth = typeof params.lineWidth==='undefined'?this.lineWidth:params.lineWidth;
    this.lineStyle = typeof params.lineStyle==='undefined'?this.lineStyle:params.lineStyle;
    this.axisLabelVisible = typeof params.axisLabelVisible==='undefined'?this.axisLabelVisible:params.axisLabelVisible;
    this.title =typeof params.title==='undefined'?this.title:params.title;
  }
}

export interface Priceline{
  price: number;
  color: string;
  shape: string;
  lineWidth: number;
  lineStyle: number;
  axisLabelVisible: boolean;
  title: string;
}
