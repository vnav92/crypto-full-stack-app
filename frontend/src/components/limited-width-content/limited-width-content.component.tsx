import React from 'react';
import classNames from 'classnames';

import styles from './limited-width-content.module.scss';

type LimitedWidthContentProps = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
};

export const LimitedWidthContent: React.FC<LimitedWidthContentProps> = ({
  className,
  children,
}) => (
  <div className={classNames(styles.limitedWidthContentWrapper, className)}>
    {children}
  </div>
);
