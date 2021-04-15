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
  ParamsOptions,
  IntrumentModel,
  TicksseriesModel
} from './models/index';
import { NavbarService } from './services/navbar.service';
import { ResolverService } from  './services/resolver.service';
import { Observable } from 'rxjs';

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

  @Input() params:[ParamsOptions];

  public elRef: ElementRef;

  public ChartModel = new ChartModel;

  public CandleModel = new CandleModel;

  public HistogramModel = new HistogramModel;

  public TicksModel = new TicksModel;

  public PricelineModel = new PricelineModel;

  public IntrumentModel = new IntrumentModel;

  public TicksseriesModel = new TicksseriesModel;

  public IntrumentsObservable: Observable<IntrumentModel>;

  public candleSeries;

  public chart:any;

  constructor(
    private renderer: Renderer2,
    elRef: ElementRef,
    private ResolverService:ResolverService,
    private NavbarService:NavbarService
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
    this.params.map(event =>{
      switch(event.eventname){
        case 'createChartEvent': this.createChartEvent(event); break;
        case 'createPriceLine': this.createPriceLineEvent(event); break;
        case 'mergeTickToBarEvent': this.mergeTickToBarEvent(event); break;
        default: this.createChartEvent(event); break;
      }
    });
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

   mergeTickToBarEvent(event){
    let symbol = [event.event.symbol];
    // this.IntrumentsObservable = new Observable<IntrumentModel>((observer) => {
    //   observer.next(this.IntrumentModel);
    // });
    this.ResolverService.RatesSuscription(symbol, (data) => {
      // this.TicksModel.stockTickToBar(data,(currentBar)=>{
        //0-sell,1-buy, 4-high, 5-low
        this.TicksModel.currentBar = {
          time: data.Updated,
          open: parseFloat(data.Rates[0]),
          high: parseFloat(data.Rates[1]),
          low: parseFloat(data.Rates[0]),
          close: parseFloat(data.Rates[1])
        }

        this.TicksModel.currentBar = this.TicksseriesModel
        .getInterval('1MIN',this.TicksModel.currentBar);
        this.candleSeries.update(this.TicksModel.currentBar);
        this.IntrumentModel.setParams(
          Object.assign(this.TicksModel.currentBar, {symbol:data.Symbol}));
        // console.log(this.IntrumentModel);
        // this.emiterIntrument(this.IntrumentModel);
        // this.IntrumentsObservable.subscribe();
        // this.IntrumentsObservable = new Observable<IntrumentModel>(observer => {
        //     observer.next(this.IntrumentModel);
        // });
        this.IntrumentsObservable = this.NavbarService.getParamsObserve(this.IntrumentModel);
        this.IntrumentsObservable.subscribe(v=>{

          // this.IntrumentModel = v;
          this.IntrumentModel.setParams(v);
          // console.log(this.IntrumentModel);
        })
        // this.IntrumentsObservable.subscribe({
        //   next(data) {
        //     // console.log(data);
        //     return data
        //   },
        //   error(error) {
        //     console.log(error);
        //   }
        // });
        // this.IntrumentsObservable.subscribe({
        //   next: x =>{
        //     console.log(x);
        //     x = this.IntrumentModel;
        //   }
        // });

      // });
    });

  }

  public emiterIntrument(Intruments){
    this.IntrumentsObservable  = new Observable<IntrumentModel>((observer) => {
        console.log(Intruments);
        observer.next(Intruments);
    });
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
