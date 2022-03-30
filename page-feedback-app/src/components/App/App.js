import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';
import Form from '../Form/Form';
import Feedback from '../Feedback/Feedback';

const App = ({ isInEditor, isAdmin, feedback }) => {
  console.log(feedback);

  return (
    <div className={styles.container}>
      {isInEditor ?
        <p className={styles.editorText}>
          Du är i redigeringsläge du kan enbart lämna feedback i visningsläget.
        </p>
        :
        <Form />
      }

      {isAdmin && feedback && feedback.length > 0 &&
        <h3 className={styles.feedbackHeader}>Feedback lämnad om sidan</h3>
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
