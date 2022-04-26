import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';
import Form from '../Form/Form';
import Feedback from '../Feedback/Feedback';
import i18n from '@sitevision/api/common/i18n';

const App = ({ isInEditor, isAdmin, feedback }) => {

  return (
    <div className={styles.container}>
      {isInEditor ?
        <p className={styles.editorText}>
          {i18n.get('editorMode')}
        </p>
        :
        <Form />
      }

      {isAdmin && feedback && feedback.length > 0 &&
        <h3 className={styles.feedbackHeader}>
          {i18n.get('recivedFeedback')}
        </h3>
      }

      {isAdmin && feedback.map((f) =>
        <Feedback key={f.dsid} feedback={f}></Feedback>
      )}
    </div>
  );
};

App.propTypes = {
  isInEditor: PropTypes.bool,
  isAdmin: PropTypes.bool,
  feedback: PropTypes.array
};

export default App;
