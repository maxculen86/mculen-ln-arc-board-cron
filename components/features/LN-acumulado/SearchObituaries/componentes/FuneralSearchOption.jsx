import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@ln/common-ui-select';

function FuneralSearchOption({ value, label, ...r }) {
    return <Select.Options key={value} value={value} label={label} {...r} />;
}

FuneralSearchOption.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default FuneralSearchOption;
