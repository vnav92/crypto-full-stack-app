import { Router } from 'express';

import { exchangeController } from '../controllers';
import { validateExchangeRequest } from '../validators';

export const exchangeRoutes = Router();

exchangeRoutes.get(
  '/exchange',
  (
    request: Parameters<typeof exchangeController>[0],
    response: Parameters<typeof exchangeController>[1]
  ) => {
    const { isValidationError } = validateExchangeRequest(request, response);

    if (isValidationError) {
      return;
    }

    return exchangeController(request, response);
  }
);
