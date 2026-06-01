import React from 'react';
import { Option } from '@ln/ds-common-option';

function Checkbox({
    label,
    size = 24,
    className,
    labelClassName,
    checkboxProps = {},
    ...optionProps
}) {
    return (
        <Option size={size} className={className} {...optionProps}>
            <Option.Checkbox {...checkboxProps} />
            <Option.Label className={labelClassName}>{label}</Option.Label>
        </Option>
    );
}

export default Checkbox;
