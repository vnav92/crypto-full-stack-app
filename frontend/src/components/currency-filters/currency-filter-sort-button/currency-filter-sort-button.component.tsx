import React from 'react';

import { Button } from '@chakra-ui/react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import { SortVariant } from '../currency-filters.type';

import styles from './currency-filter-sort-button.module.scss';

type CurrencyFilterSortButtonProps = {
  isDisabled: boolean;
  sortVariant: SortVariant;
  onClick: () => void;
  children: React.ReactNode;
};

export const CurrencyFilterSortButton: React.FC<
  CurrencyFilterSortButtonProps
> = ({ isDisabled, sortVariant, onClick, children }) => {
  const ButtonSortIcon =
    sortVariant === 'ascending' ? AiOutlineArrowUp : AiOutlineArrowDown;

  return (
    <Button onClick={onClick} isDisabled={isDisabled}>
      {children}
      {sortVariant && <ButtonSortIcon className={styles.sortIcon} />}
    </Button>
  );
};
