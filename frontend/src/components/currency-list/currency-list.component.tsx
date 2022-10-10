import React from 'react';

import { Spinner } from '@chakra-ui/react';
import classNames from 'classnames';

import { CurrencyResponse } from '../../shared';
import { CurrencyListItem } from '../currency-list-item';
import { LimitedWidthContent } from '../limited-width-content';

import styles from './currency-list.module.scss';

type CurrencyListProps = {
  isLoading: boolean;
  data: CurrencyResponse[] | undefined;
};

export const CurrencyList: React.FC<CurrencyListProps> = ({
  isLoading,
  data,
}) => {
  return (
    <LimitedWidthContent
      className={classNames({ [styles.spinnerWrapper]: isLoading })}
    >
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <>
          {data && data.length ? (
            <div className={styles.listWrapper}>
              {data.map((currency) => (
                <CurrencyListItem key={currency.id} currency={currency} />
              ))}
            </div>
          ) : null}
        </>
      )}
    </LimitedWidthContent>
  );
};
