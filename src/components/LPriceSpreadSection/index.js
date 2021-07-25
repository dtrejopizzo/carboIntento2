import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Tooltips from 'components/Tooltip';
import { useWatch } from 'react-hook-form';
import BN from 'helpers/BN';
import fetchMarketPrice from 'helpers/fetchMarketPrice';
import sevenDigit from 'helpers/sevenDigit';
import ColorizedPriceImpact from 'pages/Home/ColorizedPriceImpact';
import appConsts from 'appConsts';
import styles from './styles.module.scss';

export default function LPriceSpreadSection({
  value, onChange, control, paths, estimatedPrice, upperLoading,
}) {
  const [active, setActive] = useState(0);
  const isActive = (index) => ((active === index) ? 'active' : '');
  const tolerances = ['0.1', '0.5'];
  const formValues = useWatch({ control });
  const [marketPrice, setMarketPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetchMarketPrice(
      formValues.from.asset.details,
      formValues.to.asset.details,
    )
      .then((counterPrice) => {
        if (counterPrice) {
          setMarketPrice(counterPrice);
        }
      }).finally(() => setLoading(false));
  }, [
    formValues.from.asset.details.getCode(),
    formValues.from.asset.details.getIssuer(),
    formValues.to.asset.details.getCode(),
    formValues.to.asset.details.getIssuer(),
  ]);

  const calculatedMin = new BN(estimatedPrice)
    .times(new BN(1).minus(new BN(value || 0).div(100)));
  const priceImpact = new BN(1)
    .minus(new BN(estimatedPrice).div(new BN(marketPrice).times(formValues.from.amount)))
    .times(100);

  let finalPriceImpact = priceImpact.isNaN() ? new BN('0') : priceImpact;
  if (finalPriceImpact.isLessThan(0)) {
    finalPriceImpact = new BN(0);
  }

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.label}>Minimum received
          <Tooltips id="minimum" text={appConsts.tooltip.min}><span className="icon-question-circle" /></Tooltips>
        </div>
        <div className={styles.info}>
          {loading || upperLoading
            ? 'Loading'
            : (
              <>
                {`${sevenDigit(calculatedMin.toString())} ${formValues.to.asset.details.getCode()}`}
              </>
            )}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>Price impact
          <Tooltips id="price" text={appConsts.tooltip.priceImpact}><span className="icon-question-circle" /></Tooltips>
        </div>
        <div className={styles.info}>{loading || upperLoading ? 'Loading' : <ColorizedPriceImpact impact={finalPriceImpact} />}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>Slippage tolerance
          <Tooltips id="tolerance" text={appConsts.tooltip.spread}><span className="icon-question-circle" /></Tooltips>
        </div>
        <div className={styles['button-group']}>
          {tolerances.slice(0, tolerances.length + 1).map((item, index) => (
            <button
              type="button"
              key={index}
              className={classNames(isActive(index))}
              onClick={() => {
                setActive(index);
                onChange(tolerances[index]);
              }}
            >
              {tolerances[index]}%
            </button>
          ))}
          <button
            type="button"
            className={classNames(isActive(2), styles.custom)}
            onClick={() => {
              setActive(2);
              onChange(value);
            }}
          >
            <input
              name="custom"
              placeholder="custom"
              value={active !== 2 ? '' : value}
              onChange={(e) => {
                e.preventDefault();

                const number = new BN(e.target.value);
                if (!number.isNaN()) {
                  onChange(e.target.value);
                } else if (e.target.value === '') {
                  onChange(null);
                }
              }}
            />
            %
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.label}>Path
          <Tooltips id="path" text={appConsts.tooltip.path}><span className="icon-question-circle" /></Tooltips>
        </div>
        <div className={styles.path}>
          {[
            formValues.from.asset.details.getCode(),
            ...paths.map((i) => i.asset_code),
            formValues.to.asset.details.getCode(),
          ].map((item, index) => (
            <div className={styles['path-container']} key={index}>
              <span>{item?.toUpperCase() || 'XLM'}</span>
              <span className="icon-arrow-right" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
