export enum CurrencyFilterVariant {
  NOT_SUPPORTED_IN_US_FILTER = 'notSupportedInUsFilter',
  NOT_AVAILABLE_IN_TEST_MODE_FILTER = 'notAvailableInTestModeFilter',
  CURRENCY_NAME_ASCENDING_SORT = 'currencyNameAscendingSort',
  CURRENCY_NAME_DESCENDING_SORT = 'currencyNameDescendingSort',
  CURRENCY_CODE_ASCENDING_SORT = 'currencyCodeAscendingSort',
  CURRENCY_CODE_DESCENDING_SORT = 'currencyCodeDescendingSort',
}

export type SortVariant = 'ascending' | 'descending' | null;

export enum SortByProperty {
  NAME,
  CODE,
}

export type SortFunctionConfig = Record<
  'ascendingSort' | 'descendingSort',
  CurrencyFilterVariant
>;
