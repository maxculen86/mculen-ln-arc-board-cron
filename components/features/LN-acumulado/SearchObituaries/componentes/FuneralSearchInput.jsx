import React from 'react';
import PropTypes from 'prop-types';
import { Inputfield } from '@ln/common-ui-inputfield';

function FuneralSearchInput({ onChange, value, name, ...r }) {
    return (
        <Inputfield
            autoFocus
            onChange={onChange}
            value={value}
            name={name}
            {...r}
        />
    );
}

FuneralSearchInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string.isRequired
};

FuneralSearchInput.defaultProps = {
    onChange: () => {},
    value: ''
};

export default FuneralSearchInput;
