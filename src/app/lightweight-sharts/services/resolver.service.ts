import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { RatesSubscriptionService } from './../graphql/rates-subscription.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  /**
   *
   */
  public GRAPHQL_ENDPOINT = environment.wss;

  /**
   *
   */
  public apolloClient;

  /**
   *
   */
  public SubscriptionClientWs:SubscriptionClient;

  /**
   *
   * @param InstrumentosQueryService
   * @param TransactionbyuseridQueryService
   * @param NoticiasQueryService
   * @param TransactionSuscriptionService
   */
  constructor(
    private readonly RatesSubscriptionService: RatesSubscriptionService
  ) {
    this.SubscriptionClientWs = new SubscriptionClient(this.GRAPHQL_ENDPOINT, {
      reconnect: true
    });
    let WebSocketLinkWs = new WebSocketLink(this.SubscriptionClientWs);
    const cache = new InMemoryCache();
    this.apolloClient = new ApolloClient({
      cache: cache,
      link: WebSocketLinkWs
    });
  }

  /**
   * Suscription Transactions por Usuario
   *
   * @param userid
   * @param callback
   */
  async RatesSuscription(symbol, callback) {
    await this.apolloClient.
      subscribe({
        query: this.RatesSubscriptionService.document,
        variables: { symbol: symbol }
      }).
      subscribe({
        next(data) {
          callback(data.data.RatesSuscription);
        },
        error(error) {
          console.log(error);
        }
      });
  }

  /**
   * cierra conexion de ws
   */
  unsubscribeAll() {
    this.SubscriptionClientWs.unsubscribeAll();
  }
}
