import { BAD_REQUEST } from 'http-codes';

import { exchangeController } from '../controllers';
import { logger } from '../utils';

type ExchangeValidatorConfigItem = {
  validateFunction: (
    request: Parameters<typeof exchangeController>[0]
  ) => boolean;
  loggerText: string;
  responseErrorText: string;
};

const exchangeValidatorConfig: ExchangeValidatorConfigItem[] = [
  {
    validateFunction: ({ query }) => !query.amount,
    loggerText: `Exchange: no 'amount' query param specified`,
    responseErrorText: `'amount' query param is required`,
  },
  {
    validateFunction: ({ query }) => isNaN(Number(query.amount)),
    loggerText: `Exchange: 'amount' query param is not a number`,
    responseErrorText: `'amount' query param should be a number`,
  },
  {
    validateFunction: ({ query }) => Number(query.amount) < 0,
    loggerText: `Exchange: 'amount' query param value is not greater than 0`,
    responseErrorText: `'amount' query param value should be greater than 0`,
  },
  {
    validateFunction: ({ query }) => {
      if (Number(query.amount) % 1 === 0) {
        return false;
      } else {
        const splittedDecimalString = query.amount.split('.');

        return splittedDecimalString[1].length > 8;
      }
    },
    loggerText: `Exchange: 'amount' query param has precision greater than 8`,
    responseErrorText: `'amount' query param precision cannot be greater than 8`,
  },
];

export const validateExchangeRequest = (
  request: Parameters<typeof exchangeController>[0],
  response: Parameters<typeof exchangeController>[1]
) => {
  let isValidationError = false;

  exchangeValidatorConfig.forEach(
    ({ validateFunction, loggerText, responseErrorText }) => {
      if (validateFunction(request)) {
        logger.error(loggerText);
        response.status(BAD_REQUEST).send({ error: responseErrorText });

        isValidationError = true;
      }
    }
  );

  return { isValidationError };
};
