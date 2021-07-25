import Button from 'components/Button';
import CurrencyInput from 'components/CurrencyInput';
import BN from 'helpers/BN';
import isSameAsset from 'helpers/isSameAsset';
import { useSelector } from 'react-redux';
import store from 'store';
import styles from './styles.module.scss';

export default function LCurrencyInput({
  value,
  onChange,
  showMax = false,
  label,
  onChangeInput,
  originChange,
  getFormValues,
  swapFromWithTo,
  changeToAsset,
}) {
  const isLogged = useSelector((state) => state.user.logged);

  function setCurrency(asset) {
    onChange({ ...value, asset });
    originChange(getFormValues().from.amount);
  }

  function setMaxBalance() {
    const userBalance = store.getState().userBalance;
    const found = userBalance.find((i) => isSameAsset(i.asset, value.asset.details));

    if (found) {
      onChange({ ...value, amount: found.balance });
      onChangeInput(found.balance);
    }
  }

  return (
    <CurrencyInput
      label={label}
      currentCurrency={value.asset}
      setCurrency={setCurrency}
      getFormValues={getFormValues}
      swapFromWithTo={swapFromWithTo}
      changeToAsset={changeToAsset}
    >
      <input
        placeholder="0.0"
        value={value.amount || ''}
        onChange={(e) => {
          e.preventDefault();

          const number = new BN(e.target.value);
          if (!number.isNaN()) {
            onChange({ ...value, amount: e.target.value });
            onChangeInput(e.target.value);
          } else if (e.target.value === '') {
            onChange({ ...value, amount: null });
            onChangeInput(null);
          }
        }}
      />
      {showMax && isLogged && <Button variant="secondary" content="MAX" fontWeight={500} className={styles.max} onClick={setMaxBalance} />}
    </CurrencyInput>
  );
}
