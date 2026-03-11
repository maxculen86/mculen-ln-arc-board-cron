import React from 'react';
import { Inputfield } from '@ln/common-ui-inputfield';

function FuneralSearchInput({ onChange = () => {}, value = '', name, ...r }) {
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

export default FuneralSearchInput;
