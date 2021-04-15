export class HistogramModel{
  public getParams(){
    return {
      color: '#1d5f5e',
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      }
    }
  }
}
