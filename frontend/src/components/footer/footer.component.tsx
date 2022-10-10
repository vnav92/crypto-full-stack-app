import React from 'react';

import moonPayLogo from '../../assets/moon-pay-logo-black.png';

import styles from './footer.module.scss';

export const Footer = () => (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerFirstLine}>
        Created for{' '}
        <img
          className={styles.companyLogo}
          src={moonPayLogo}
          alt="MoonPay company logo"
        />
      </div>
      <span className={styles.footerSecondLine}>by Mateusz Jankowski</span>
    </footer>
  );
