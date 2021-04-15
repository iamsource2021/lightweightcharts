import { Injectable } from '@angular/core';
import { Subscription } from 'apollo-angular';
import gql from 'graphql-tag';

type RatesModel = {
    "Updated": string,
    "Symbol": string,
    "Rates": string[]
}
type RatesSubscriptionEventsListResponse = {
  events: RatesModel;
}

export type RatesSubscriptionEventsListVariables = {
	symbol: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RatesSubscriptionService
extends Subscription<RatesSubscriptionEventsListResponse,
RatesSubscriptionEventsListVariables>{
  document = gql`
  subscription RatesSuscription($symbol: [String!]){
    RatesSuscription(symbol:$symbol){
        Updated
        Rates
        Symbol 
    }
  }
  `;
}
