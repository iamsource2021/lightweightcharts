import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input
} from '@angular/core'
import { createChart } from 'lightweight-charts';
// import { priceData } from './data/priceData';
// import { volumeData } from './data/volumeData';
import {
  ChartModel,
  CandleModel,
  HistogramModel,
  TicksModel,
  PricelineModel,
  IntrumentModel,
  TicksseriesModel
} from './models/index';
import { NavbarService } from './services/navbar.service';
import { ResolverService } from  './services/resolver.service';

@Component({
  selector: 'lightweight-sharts',
  templateUrl: './lightweight-sharts.component.html',
  styleUrls: [
    './lightweight-sharts.component.scss',
    './../../assets/lightweightcharts/bootstrap/css/bootstrap.min.css',
    './../../assets/lightweightcharts/css/styles.min.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LightweightShartsComponent implements OnInit {

  @Input() params:string;

  public elRef: ElementRef;

  public ChartModel = new ChartModel;

  public CandleModel = new CandleModel;

  public HistogramModel = new HistogramModel;

  public TicksModel = new TicksModel;

  public PricelineModel = new PricelineModel;

  public IntrumentModel = new IntrumentModel;

  public TicksseriesModel = new TicksseriesModel;

  public symbol: string;

  public price:number;

  public symbolObservable: Promise<string>;

  public candleSeries;

  public chart:any;

  constructor(
    private renderer: Renderer2,
    elRef: ElementRef,
    private ResolverService:ResolverService
  ) {
    this.elRef = elRef;
  }

  ngOnInit(): void {
    // this.loadScript('./../assets/lightweightcharts/js/jquery.min.js');
    // this.loadScript('./../assets/lightweightcharts/bootstrap/js/bootstrap.min.js');
    this.triggerEvent();
  }

  randomInt(min, max){
    return min + Math.floor((max - min) * Math.random());
  }

  triggerEvent(){
    this.mergeTickToBarEvent();
    // this.params.map(event =>{
    //   switch(event.eventname){
    //     case 'createChartEvent': this.createChartEvent(event); break;
    //     case 'createPriceLine': this.createPriceLineEvent(event); break;
    //     case 'mergeTickToBarEvent': this.mergeTickToBarEvent(event); break;
    //     default: this.createChartEvent(event); break;
    //   }
    // });
  }

  createPriceLineEvent(params){
    this.PricelineModel.setParams(params.event);
    this.candleSeries.createPriceLine(this.PricelineModel.getParams());
  }

  createChartEvent(params){
    this.ChartModel.setParams(params.event);
    let chartContainer = document.querySelector(this.ChartModel.querySelectorEvent)
    .shadowRoot.querySelector("div.chart-container");
    let container = this.renderer.createElement('div');
    this.renderer.appendChild(chartContainer, container);
    this.chart = createChart(container,this.ChartModel.getParams());

    //add Series
    this.candleSeries = this.chart.addCandlestickSeries(this.CandleModel.getParams());
    this.chart.applyOptions(
      {
        timeScale:
        {
          rightOffset:12,
          timeVisible: true,
          barSpacing:10,
          secondsVisible: true,
        },
        priceScale:
        {
          autoScale:true
        },
      });
    // this.candleSeries.setData(priceData);
    // this.IntrumentModel.setParams(Object.assign(priceData[priceData.length - 1], {symbol:'BTCUSDT'}));

    //add Volumen
    // let volumeSeries = this.chart.addHistogramSeries(this.HistogramModel.getParams());
    // volumeSeries.setData(volumeData);
    // console.log(this.chart.timeScale().getVisibleLogicalRange());
    this.TicksModel.init();
  }

 async setUpdatescandles(data){
    this.TicksModel.setCurrentBar(data);
    this.TicksModel.currentBar = await this.TicksseriesModel
    .getInterval('1MIN',this.TicksModel.currentBar);
    await this.candleSeries.update(this.TicksModel.currentBar);
  }

  async mergeTickToBarEvent(){
    this.forceUpdate(0);
    this.ChartModel.setParams({querySelectorEvent:"body > app-root > lightweight-sharts"});
    let chartContainer = document.querySelector(this.ChartModel.querySelectorEvent)
    .shadowRoot.querySelector("div.chart-container");
    let container = this.renderer.createElement('div');
    this.renderer.appendChild(chartContainer, container);
    this.chart = createChart(container,this.ChartModel.getParams());

    //add Series
    this.candleSeries = this.chart.addCandlestickSeries(this.CandleModel.getParams());
    this.chart.applyOptions(
      {
        timeScale:
        {
          rightOffset:12,
          timeVisible: true,
          barSpacing:10,
          secondsVisible: true,
        },
        priceScale:
        {
          autoScale:true
        },
      });
    let symbol = [this.params];
    this.symbol = this.params;

    await this.ResolverService.RatesSuscription(symbol,async data=>{
      await this.setUpdatescandles(data);
      this.IntrumentModel.setParams(
      Object.assign(this.TicksModel.currentBar, {symbol:data.Symbol}));
      let pricel = parseFloat(this.TicksModel.currentBar.close);
      this.forceUpdate(pricel);
    });
  }

  public forceUpdate(price){
    this.price = price;
    let pricel = document.querySelector(this.ChartModel.querySelectorEvent)
    .shadowRoot.querySelector("#price").innerHTML = price.toFixed(2);
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
