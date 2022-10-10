import React, { useState, useEffect } from 'react';

import { shuffle } from 'lodash';
import { Switch, Button } from '@chakra-ui/react';
import { AiOutlineShake } from 'react-icons/ai';

import { CurrencyResponse } from '../../shared';
import { LimitedWidthContent } from '../limited-width-content';
import styles from './currency-filters.module.scss';
import {
  CurrencyFilterVariant,
  SortVariant,
  SortByProperty,
  SortFunctionConfig,
} from './currency-filters.type';
import { CurrencyFilterSortButton } from './currency-filter-sort-button';
import { getFilteredCurrencies } from './get-filtered-currencies.util';

type CurrencyFiltersProps = {
  isLoading: boolean;
  allCurrencies: CurrencyResponse[];
  onCurrenciesFilter: (currencies: CurrencyResponse[]) => void;
};

const SORT_BY_NAME_CONFIG: SortFunctionConfig = {
  ascendingSort: CurrencyFilterVariant.CURRENCY_NAME_ASCENDING_SORT,
  descendingSort: CurrencyFilterVariant.CURRENCY_NAME_DESCENDING_SORT,
};

const SORT_BY_CODE_CONFIG: SortFunctionConfig = {
  ascendingSort: CurrencyFilterVariant.CURRENCY_CODE_ASCENDING_SORT,
  descendingSort: CurrencyFilterVariant.CURRENCY_CODE_DESCENDING_SORT,
};

export const CurrencyFilters: React.FC<CurrencyFiltersProps> = ({
  isLoading,
  allCurrencies,
  onCurrenciesFilter,
}) => {
  const [currentFilters, setCurrentFilters] = useState<CurrencyFilterVariant[]>(
    []
  );
  const [sortByProperty, setSortByProperty] = useState<SortByProperty | null>(
    null
  );
  const filteredCurrencies = getFilteredCurrencies(
    allCurrencies,
    currentFilters
  );

  useEffect(() => {
    onCurrenciesFilter(filteredCurrencies);
  }, [filteredCurrencies, onCurrenciesFilter]);

  const hasFilterEnabled = (filter: CurrencyFilterVariant) =>
    currentFilters.includes(filter);

  const getListWithRemovedFilter = (filterToRemove: CurrencyFilterVariant) =>
    currentFilters.filter((filterItem) => filterItem !== filterToRemove);

  const getCurrentFilters = (changedFilter: CurrencyFilterVariant) =>
    hasFilterEnabled(changedFilter)
      ? currentFilters.filter((filterItem) => filterItem !== changedFilter)
      : [...currentFilters, changedFilter];

  const setSorting = ({
    ascendingSort,
    descendingSort,
  }: SortFunctionConfig) => {
    if (!hasFilterEnabled(ascendingSort) && !hasFilterEnabled(descendingSort)) {
      setCurrentFilters((filters) => [...filters, ascendingSort]);
    } else if (hasFilterEnabled(ascendingSort)) {
      setCurrentFilters([
        ...getListWithRemovedFilter(ascendingSort),
        descendingSort,
      ]);
    } else {
      setCurrentFilters([...getListWithRemovedFilter(descendingSort)]);
    }
  };

  const getSortVariant = ({
    ascendingSort,
    descendingSort,
  }: SortFunctionConfig): SortVariant =>
    hasFilterEnabled(ascendingSort)
      ? 'ascending'
      : hasFilterEnabled(descendingSort)
      ? 'descending'
      : null;

  return (
    <LimitedWidthContent className={styles.currencyFiltersWrapper}>
      <form className={styles.dataManipulationWrapper}>
        <label className={styles.switchLabel}>
          <Switch
            size="lg"
            isChecked={hasFilterEnabled(
              CurrencyFilterVariant.NOT_SUPPORTED_IN_US_FILTER
            )}
            isDisabled={isLoading}
            onChange={() =>
              setCurrentFilters(
                getCurrentFilters(
                  CurrencyFilterVariant.NOT_SUPPORTED_IN_US_FILTER
                )
              )
            }
          />
          Display currencies not supported in the US
        </label>
        <label className={styles.switchLabel}>
          <Switch
            size="lg"
            isChecked={hasFilterEnabled(
              CurrencyFilterVariant.NOT_AVAILABLE_IN_TEST_MODE_FILTER
            )}
            isDisabled={isLoading}
            onChange={() =>
              setCurrentFilters(
                getCurrentFilters(
                  CurrencyFilterVariant.NOT_AVAILABLE_IN_TEST_MODE_FILTER
                )
              )
            }
          />
          Display currencies not available in the test mode
        </label>
        <div className={styles.sortButtonsWrapper}>
          <CurrencyFilterSortButton
            sortVariant={
              sortByProperty !== SortByProperty.NAME
                ? null
                : getSortVariant(SORT_BY_NAME_CONFIG)
            }
            isDisabled={isLoading}
            onClick={() => {
              setSortByProperty(SortByProperty.NAME);
              setSorting(SORT_BY_NAME_CONFIG);
            }}
          >
            Sort by currency name
          </CurrencyFilterSortButton>
          <CurrencyFilterSortButton
            sortVariant={
              sortByProperty !== SortByProperty.CODE
                ? null
                : getSortVariant(SORT_BY_CODE_CONFIG)
            }
            isDisabled={isLoading}
            onClick={() => {
              setSortByProperty(SortByProperty.CODE);
              setSorting(SORT_BY_CODE_CONFIG);
            }}
          >
            Sort by currency code
          </CurrencyFilterSortButton>
        </div>
      </form>
      <div className={styles.shuffleButtonWrapper}>
        <Button
          className={styles.shuffleButton}
          isDisabled={isLoading}
          onClick={() => {
            setCurrentFilters([]);
            onCurrenciesFilter(shuffle(allCurrencies));
          }}
        >
          Shuffle
          <AiOutlineShake />
        </Button>
      </div>
    </LimitedWidthContent>
  );
};
