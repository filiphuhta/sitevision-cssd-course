import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Feedback.scss';

const Feedback = ({ feedback }) => {
    return (
        <div className={styles.container}>
            <article className={"env-comment env-media " + feedback.isOutdated ? styles.outdated : ""}>
                {feedback.isOutdated && 
                <p className={"env-text " + styles.message} > * Denna feedback är utdaterad * </p>
                }
                <div className="env-media__body">
                    <p className={"env-text " + styles.message}>
                        {feedback.message}
                    </p>
                    <footer className="env-comment__footer">
                        <ul className="env-list env-list--horizontal env-list-dividers--left">
                            <li className={"env-list__item  " + styles.textColor}>
                                <small>
                                    <b>Feedback lämnad av:</b> {feedback.name}
                                    <br />
                                    <b>Sida:</b> {feedback.page}
                                    <br />
                                    <time>
                                        <b>Datum:</b> {feedback.date}
                                    </time>
                                </small>
                            </li>
                        </ul>
                    </footer>
                </div>
            </article>
        </div>
    );
};

Feedback.propTypes = {
    feedback: PropTypes.object
};

export default Feedback;
