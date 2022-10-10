import { ExchangeName } from './exchange-name.type';

export type TheCheapestExchangeResponse = {
  btcAmount: number;
  usdAmount: number;
  exchange: ExchangeName;
};
