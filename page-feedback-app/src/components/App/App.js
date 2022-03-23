import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';
import Form from '../Form/Form';
import Feedback from '../Feedback/Feedback';

const App = ({ isInEditor, isAdmin }) => {


  return (
    <div className={styles.container}>
      {isInEditor ?
        <p className={styles.editorText}>
          Du är i redigeringsläge du kan enbart lämna feedback i visningsläget.
        </p>
        :
        <Form />
      }
      {isAdmin && <Feedback></Feedback>}
    </div>
  );
};

App.propTypes = {
  isInEditor: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default App;
