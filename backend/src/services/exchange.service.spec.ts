import { ParsedOrderBookItem, ExchangeName } from '../types';
import {
  getCryptoAmountPrice,
  ExchangeResponses,
  getTheCheapestExchange,
} from './exchange.service';

const mockExchangeOneResponse: ParsedOrderBookItem[] = [
  { price: 0.18, amount: 0.1 },
  { price: 0.21, amount: 0.5 },
  { price: 0.25, amount: 0.3 },
];

const mockExchangeTwoResponse: ParsedOrderBookItem[] = [
  { price: 0.181, amount: 0.1 },
  { price: 0.211, amount: 0.5 },
  { price: 0.251, amount: 0.3 },
];

describe('ExchangeService', () => {
  describe('getCryptoAmountPrice', () => {
    it('should return the lowest cost when amount equals one transaction from order book', () => {
      expect(
        getCryptoAmountPrice(
          mockExchangeOneResponse[0].amount,
          mockExchangeOneResponse
        )
      ).toBe(0.018);
    });

    it('should return the lowest cost when amount equals two transactions from order book', () => {
      const mockAmount =
        mockExchangeOneResponse[0].amount + mockExchangeOneResponse[1].amount;

      expect(getCryptoAmountPrice(mockAmount, mockExchangeOneResponse)).toBe(
        0.123
      );
    });

    it('should return the lowest cost when amount equals fraction of the order books transaction', () => {
      const mockAmount =
        mockExchangeOneResponse[0].amount +
        mockExchangeOneResponse[1].amount +
        0.1 * mockExchangeOneResponse[2].amount;

      expect(getCryptoAmountPrice(mockAmount, mockExchangeOneResponse)).toBe(
        0.1305
      );
    });
  });

  describe('getTheCheapestExchange', () => {
    const mockExchangeResponses: ExchangeResponses = [
      { name: ExchangeName.BINANCE, response: mockExchangeOneResponse },
      { name: ExchangeName.COINBASE, response: mockExchangeTwoResponse },
    ];

    it('should return the cheapest result', () => {
      const mockAmount = 0.61;

      expect(getTheCheapestExchange(mockExchangeResponses, mockAmount)).toEqual(
        {
          btcAmount: mockAmount,
          exchange: ExchangeName.BINANCE,
          usdAmount: 0.1255,
        }
      );
    });
  });
});
