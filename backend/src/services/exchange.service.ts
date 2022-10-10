import fetch from 'node-fetch';
import Decimal from 'decimal.js';
import { OK as OK_STATUS_CODE } from 'http-codes';

import {
  ExchangeApiResponse,
  ParsedOrderBookItem,
  TheCheapestExchangeResponse,
  ExchangeName,
} from '../types';
import { logger } from '../utils';

export type ExchangeResponses = {
  name: ExchangeName;
  response: ParsedOrderBookItem[];
}[];

export const getExchangeOrderBook = async <T = ExchangeApiResponse>(
  url: string
): Promise<T> => {
  let response = await fetch(url);

  if (response.status !== OK_STATUS_CODE) {
    logger.error(
      '[exchange.service.ts]: getExchangeOrderBook: data fetching error'
    );
    throw { status: response.status, message: response.json() };
  }

  return response.json();
};

const getMappedExchangeCosts = (
  exchangeResponses: ExchangeResponses,
  currencyAmount: number
): TheCheapestExchangeResponse[] =>
  exchangeResponses.map(({ name, response }) => ({
    exchange: name,
    btcAmount: currencyAmount,
    usdAmount: getCryptoAmountPrice(currencyAmount, response),
  }));

export const getTheCheapestExchange = (
  exchangeResponses: ExchangeResponses,
  currencyAmount: number
): TheCheapestExchangeResponse => {
  const mappedExchangeCosts = getMappedExchangeCosts(
    exchangeResponses,
    currencyAmount
  );
  const sortedExchangeCosts = mappedExchangeCosts.sort(
    (a, b) => a.usdAmount - b.usdAmount
  );

  return {
    btcAmount: currencyAmount,
    usdAmount: sortedExchangeCosts[0].usdAmount,
    exchange: sortedExchangeCosts[0].exchange,
  };
};

export const getCryptoAmountPrice = (
  amount: number,
  orderBookItems: ParsedOrderBookItem[]
): number => {
  const sortedByPrice = orderBookItems.sort((a, b) => a.price - b.price);

  let remainingAmount = new Decimal(amount);
  let currentCost = new Decimal(0);

  for (let item of sortedByPrice) {
    if (new Decimal(remainingAmount).minus(item.amount) > new Decimal(0)) {
      (remainingAmount = new Decimal(remainingAmount).minus(item.amount)),
        (currentCost = new Decimal(currentCost).plus(
          new Decimal(item.amount).times(item.price)
        ));
    } else {
      currentCost = new Decimal(currentCost).plus(
        new Decimal(remainingAmount).times(item.price)
      );
      remainingAmount = new Decimal(0);

      break;
    }
  }

  return currentCost.toNumber();
};
