import React from 'react';

import moonPayLogo from '../../assets/moon-pay-logo-white.png';
import { LimitedWidthContent } from '../limited-width-content';
import styles from './header.module.scss';

export const Header = () => (
  <header className={styles.headerWrapper}>
    <LimitedWidthContent>
      <img
        src={moonPayLogo}
        className={styles.companyLogo}
        alt="MoonPay company logo"
      />
    </LimitedWidthContent>
  </header>
);
