import React from 'react';
import { Select } from '@ln/common-ui-select';

function FuneralSearchSelect({ children, ...r }) {
    return (
        <Select
            openClassName="rounded-bottom-right-0 rounded-bottom-left-0"
            listClassName="flex flex-column p-16 gap-8 rounded-8 bg-white border border-right border-left border-bottom border-thin border-light-100 rounded-top-left-0 rounded-top-right-0"
            className="gap-0_m w-183_md"
            {...r}
        >
            {children}
        </Select>
    );
}

export default FuneralSearchSelect;
