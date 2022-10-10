import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-codes';

import { getExchangeOrderBook, getTheCheapestExchange } from '../services';
import {
  ExchangeName,
  ParsedOrderBookItem,
  TheCheapestExchangeResponse,
  ResponseError,
} from '../types';
import { getParsedAsksList } from '../utils/get-parsed-asks-list.util';

export const exchangeController = async (
  request: Request<{}, {}, {}, { amount: string }>,
  response: Response<TheCheapestExchangeResponse | { error: unknown }>
): Promise<void> => {
  try {
    const binanceOrderBook = await getExchangeOrderBook(
      process.env.BINANCE_ORDER_BOOK_API as string
    );
    const coinbaseOrderBook = await getExchangeOrderBook(
      process.env.COINBASE_ORDER_BOOK_API as string
    );
    const bitfinexOrderBook = await getExchangeOrderBook<{
      asks: ParsedOrderBookItem[];
      bids: ParsedOrderBookItem[];
    }>(process.env.BITFINEX_ORDER_BOOK_API as string);

    const theCheapestExchange = getTheCheapestExchange(
      [
        {
          name: ExchangeName.COINBASE,
          response: getParsedAsksList(coinbaseOrderBook.asks),
        },
        {
          name: ExchangeName.BINANCE,
          response: getParsedAsksList(binanceOrderBook.asks),
        },
        { name: ExchangeName.BITFINEX, response: bitfinexOrderBook.asks },
      ],
      Number(request.query.amount)
    );

    response.send(theCheapestExchange);
  } catch (e) {
    response
      .status((e as ResponseError).status || INTERNAL_SERVER_ERROR)
      .send({ error: e });
  }
};
