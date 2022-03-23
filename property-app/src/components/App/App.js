import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';
import i18n from '@sitevision/api/common/i18n';
import Input from '../input/Input';

const App = ({ pageName, name, prevSearches }) => {
  const [searches, setSearches] = React.useState([]);

  React.useEffect(() => {
    setSearches(prevSearches);
  }, []);

  return (
    <>
      <p className={styles.text}>{i18n.get("hello", name, pageName)}</p>
      <Input setSearches={(newSearches) => setSearches(newSearches)} />
      <ol className={"env-list env-list-dividers--top"}>
        {searches.length > 0 &&
          searches.map((item) => {
            return (
              <li className={"env-p-around--small"} key={item.dsid}>
                {`input: ${item.input}, value: ${item.value}`}
              </li>
            )
          })}
      </ol>
    </>
  )
};

App.propTypes = {
  pageName: PropTypes.string,
  name: PropTypes.string,
  prevSearches: PropTypes.array,
};

export default App;
