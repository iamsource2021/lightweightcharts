export interface ParamsOptions{
  event: object;
  eventname:string;
}

export class ParamsOptionsModel implements ParamsOptions{
  public event ={};
  public eventname='';

  setParams(params){
    this.event = params.event;
    this.eventname = params.eventname;
  }
}
