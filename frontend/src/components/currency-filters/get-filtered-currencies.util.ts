import { orderBy } from 'lodash';

import { CurrencyResponse } from '../../shared';
import { CurrencyFilterVariant } from './currency-filters.type';

const filterVariantToFunction: Record<
  CurrencyFilterVariant,
  (allCurrencies: CurrencyResponse[]) => CurrencyResponse[]
> = {
  [CurrencyFilterVariant.CURRENCY_CODE_ASCENDING_SORT]: (
    allCurrencies: CurrencyResponse[]
  ) => orderBy(allCurrencies, ['code'], ['asc']),
  [CurrencyFilterVariant.CURRENCY_CODE_DESCENDING_SORT]: (
    allCurrencies: CurrencyResponse[]
  ) => orderBy(allCurrencies, ['code'], ['desc']),
  [CurrencyFilterVariant.CURRENCY_NAME_ASCENDING_SORT]: (
    allCurrencies: CurrencyResponse[]
  ) => orderBy(allCurrencies, ['name'], ['asc']),
  [CurrencyFilterVariant.CURRENCY_NAME_DESCENDING_SORT]: (
    allCurrencies: CurrencyResponse[]
  ) => orderBy(allCurrencies, ['name'], ['desc']),
  [CurrencyFilterVariant.NOT_AVAILABLE_IN_TEST_MODE_FILTER]: (
    allCurrencies: CurrencyResponse[]
  ) => allCurrencies.filter(({ supportsTestMode }) => !supportsTestMode),
  [CurrencyFilterVariant.NOT_SUPPORTED_IN_US_FILTER]: (
    allCurrencies: CurrencyResponse[]
  ) => allCurrencies.filter(({ isSupportedInUS }) => !isSupportedInUS),
};

export const getFilteredCurrencies = (
  allCurrencies: CurrencyResponse[],
  currentFilters: CurrencyFilterVariant[]
) =>
  currentFilters.reduce((acc, curr) => {
    acc = filterVariantToFunction[curr](acc);

    return acc;
  }, allCurrencies);
