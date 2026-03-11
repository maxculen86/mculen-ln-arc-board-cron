import React from 'react';
import { Select } from '@ln/common-ui-select';

function FuneralSearchOption({ value, label, ...r }) {
    return <Select.Options key={value} value={value} label={label} {...r} />;
}

export default FuneralSearchOption;
