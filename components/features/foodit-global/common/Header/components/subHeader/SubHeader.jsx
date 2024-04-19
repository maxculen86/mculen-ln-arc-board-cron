import React from 'react';
import classNames from 'classnames';
import { SubHeader as CommonSubheader } from '@ln/common-ui-header';
import { useStickyHeader } from '../../hooks/useStickyHeader';

export const SubHeader = ({ children }) => {
    const { sticky } = useStickyHeader();

    const classNameSubHeader = classNames(
        'py-12 h-53 flex gap-24 jc-center ai-center jc-start_lg border border-bottom border-thin border-light-100 bg-light-1 lg-none',
        sticky ? 'show' : 'hide'
    );

    return (
        <CommonSubheader className={classNameSubHeader}>
            {children}
        </CommonSubheader>
    );
};
