import React from 'react';

import { CurrencyResponse } from '../../shared';

import styles from './currency-list-item.module.scss';

type CurrencyListItemProps = {
  currency: CurrencyResponse;
};

export const CurrencyListItem: React.FC<CurrencyListItemProps> = ({
  currency,
}) => (
  <div className={styles.listItem}>
    <span className={styles.code}>{currency.code}</span>
    <span className={styles.name}>{currency.name}</span>
    <span>supports US: {String(!!currency.isSupportedInUS)}</span>
    <span>supports test: {String(!!currency.supportsTestMode)}</span>
  </div>
);
