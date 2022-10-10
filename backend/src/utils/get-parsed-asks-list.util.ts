import { ExchangeApiResponse, ParsedOrderBookItem } from '../types';

export const getParsedAsksList = (
  asksList: ExchangeApiResponse['asks']
): ParsedOrderBookItem[] =>
  asksList.map(([price, amount]) => ({
    price: Number(price),
    amount: Number(amount),
  }));
