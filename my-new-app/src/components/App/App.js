import * as React from 'react';
import styles from './App.scss';
import appData from '@sitevision/api/server/appData';

const App = () => {
  const message = 'Hello, world!';
  const name = appData.get('name');
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        {message} {name}
      </p>
    </div>
  );
};

export default App;
