import { FC } from 'react';
import { logo } from './assets';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <img src={logo} className={styles.appLogo} alt="Logo" />
    </div>
  );
};

export default App;
