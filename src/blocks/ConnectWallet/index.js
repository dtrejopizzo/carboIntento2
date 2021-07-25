import rabetIcon from 'assets/images/rabet.svg';
import privateKeyIcon from 'assets/images/keyword.svg';
import albedoIcon from 'assets/images/albedo.svg';
// import ledgerIcon from 'assets/images/ledger.svg';
import freighterIcon from 'assets/images/freighter.svg';
import { openConnectModal, openModalAction } from 'actions/modal';
import EnterKey from 'blocks/EnterKey';
import { loginTypes } from 'reducers/user';
import Initializing from 'blocks/Initializing';
import validateFreighterPresent from 'walletIntegeration/logins/validateFreighterPresent';
import validateRabetPresent from 'walletIntegeration/logins/validateRabetPresent';
import styles from './styles.module.scss';

const ConnectWallet = () => {
  const items = [
    {
      icon: rabetIcon,
      iconSize: '14',
      text: 'Rabet',
      loginMethod: loginTypes.RABET,
      validator: validateRabetPresent,
      link: 'https://rabet.io',
    },
    {
      icon: freighterIcon,
      iconSize: '16',
      text: 'Freighter',
      loginMethod: loginTypes.FREIGHTER,
      validator: validateFreighterPresent,
      link: 'https://www.freighter.app',
    },
    // {
    //   icon: ledgerIcon,
    //   iconSize: '18',
    //   text: 'Ledger',
    //   loginMethod: loginTypes.LEDGER_S,
    //   validator: () => true,
    // },
    {
      icon: albedoIcon,
      iconSize: '18',
      text: 'Albedo',
      loginMethod: loginTypes.ALBEDO,
      validator: () => true,
    },
  ];

  const PrivateKeyLoginOption = () => (
    <button
      type="button"
      className={styles.btn}
      onClick={() => {
        openModalAction({
          modalProps: {
            back: true,
            backAction: () => {
              openConnectModal();
            },
          },
          content: <EnterKey />,
        });
      }}
    >
      <div className="d-flex align-items-center">
        <div className={styles.circle}><img src={privateKeyIcon} width={16} alt="icon" /></div>
        Private Key
      </div>
      <span className="icon-arrow-left" />
    </button>
  );

  return (
    <div className={styles.box}>
      {items.map((item, index) => (
        item.validator()
          ? (
            <button
              type="button"
              className={styles.btn}
              key={index}
              onClick={() => {
                openModalAction({
                  modalProps: {
                    back: true,
                    backAction: () => {
                      openConnectModal();
                    },
                  },
                  content: <Initializing loginMethod={item.loginMethod} />,
                });
              }}
            >
              <div className="d-flex align-items-center">
                <div className={styles.circle}><img src={item.icon} width={item.icon} alt="icon" /></div>
                {item.text}
              </div>
              <span className="icon-arrow-left" />
            </button>
          ) : (
            <a href={item.link} target="_blank" rel="noreferrer" className={styles.btnLink} style={{ textDecoration: 'none' }} key={index}>
              <div className="d-flex align-items-center">
                <div className={styles.circle}><img src={item.icon} width={item.icon} alt="icon" /></div>
                Install {item.text}
              </div>
              <span className="icon-arrow-left" style={{ transform: 'rotate(135deg)' }} />
            </a>
          )
      ))}
      <PrivateKeyLoginOption />
    </div>
  );
};

ConnectWallet.propTypes = {

};

export default ConnectWallet;
