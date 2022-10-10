import React, { useState } from 'react';

import { useGetCurrencies } from '../../api';
import { CurrencyList, CurrencyFilters } from '../../components';
import { CurrencyResponse } from '../../shared';

export const MainContent = () => {
  const { data, isLoading } = useGetCurrencies();
  const [filteredCurrencies, setFilteredCurrencies] =
    useState<CurrencyResponse[]>();

  return (
    <section>
      <CurrencyFilters
        isLoading={isLoading}
        allCurrencies={data || []}
        onCurrenciesFilter={setFilteredCurrencies}
      />
      <CurrencyList data={filteredCurrencies} isLoading={isLoading} />
    </section>
  );
};
