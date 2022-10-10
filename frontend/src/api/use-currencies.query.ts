import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { CurrencyResponse } from '../shared';

const getCurrencies = (): Promise<CurrencyResponse[]> =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/currencies`)
    .then(({ data }) => data);

export const useGetCurrencies = () =>
  useQuery<CurrencyResponse[]>(['get-currencies'], getCurrencies);
