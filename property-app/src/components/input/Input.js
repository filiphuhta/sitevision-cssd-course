import * as React from 'react';
import PropTypes from 'prop-types';
import requester from '@sitevision/api/client/requester';
import router from '@sitevision/api/common/router';
import toasts from '@sitevision/api/client/toasts';

const Input = ({setSearches}) => {
    const [inputValue, setInputValue] = React.useState("");
    const updateValue = (e) => {
        setInputValue(e.currentTarget.value);
    }

    const getProperty = () => {
        requester.doGet({
            url: router.getStandaloneUrl("/getProperty"),
            data: {
                property: inputValue
            }
        }).then((response) => {
            toasts.publish({
                message: response.propertyValue,
                type: 'primary',
                callback: () => {
                    console.log(response.propertyValue+  "succcessfully collected!");
                }
            })
            setSearches(response.prevSearches);
        }).catch((response) => {
            alert(response.responseJSON.errorMsg);
        });
    }

    return (
        <div className="env-form-element">
            <label htmlFor="search4" className="env-form-element__label">
                Search
            </label>
            <div className="env-form-element__control">
                <input
                    type="search"
                    className="env-form-input env-form-input--search"
                    placeholder="Placeholder text"
                    id="search4"
                    value={inputValue}
                    onChange={updateValue}
                />
            </div>
            <button
                onClick={getProperty}
                className="env-button env-button--primary" >
                TEST
            </button>
        </div>
    );
};

Input.propTypes = {
    setSearches: PropTypes.func,
};

export default Input;
