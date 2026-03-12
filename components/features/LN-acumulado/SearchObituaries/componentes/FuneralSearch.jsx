import React from 'react';
import { cx } from '@ln/cva';
import FuneralSearchButton from './FuneralSearchButton';
import FuneralSearchInput from './FuneralSearchInput';
import FuneralSearchSelect from './FuneralSearchSelect';
import FuneralSearchOption from './FuneralSearchOption';

function FuneralSearch({ children = null, className = '' }) {
    return (
        <div
            className={cx(
                'flex flex-column gap-16 gap-8_m max-w-620_md',
                className
            )}
        >
            {children}
        </div>
    );
}

FuneralSearch.Select = FuneralSearchSelect;
FuneralSearch.Option = FuneralSearchOption;
FuneralSearch.Input = FuneralSearchInput;
FuneralSearch.Button = FuneralSearchButton;

export default FuneralSearch;
