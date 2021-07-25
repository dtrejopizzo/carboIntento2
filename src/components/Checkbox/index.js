import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Checkbox = ({
  className, label, size, onChange, value,
}) => (
  <label className={styles.label}>
    <div className={classNames(className, styles.container)} style={{ height: `${size}px` }}>
      <input
        type="checkbox"
        className={styles['hidden-checkbox']}
        checked={value}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <div
        className={styles.checkbox}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg viewBox="0 0 24 24" className={styles.svg} style={{ visibility: value ? 'visible' : 'hidden' }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
    <span className="ml-1 checkbox-label">{label}</span>
  </label>
);

export default Checkbox;
