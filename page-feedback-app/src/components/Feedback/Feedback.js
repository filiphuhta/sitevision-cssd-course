import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Feedback.scss';

const Feedback = () => {
    return (
        <div className={styles.container}>
            <article className="env-comment env-media">
                <div className="env-media__body">
                    <header className="env-comment__header">
                        <h3 className={"env-text " + styles.textColor}>
                            Emma
                        </h3>
                    </header>
                    <p className={"env-text " + styles.textColor}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et Lorem ipsum dolor sit amet
                    </p>
                    <footer className="env-comment__footer">
                        <ul className="env-list env-list--horizontal env-list-dividers--left">
                            <li className={"env-list__item  "+ styles.textColor}>
                                <small>Datum och tid</small>
                            </li>
                        </ul>
                    </footer>
                </div>
            </article>
        </div>
    );
};

Feedback.propTypes = {
    date: PropTypes.string,
    username: PropTypes.string,
    comment: PropTypes.string,
};

export default Feedback;
