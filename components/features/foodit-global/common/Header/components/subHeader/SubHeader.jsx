import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';
import { SubHeader as CommonSubheader } from '@ln/common-ui-header';
import { useStickyHeader } from '../../hooks/useStickyHeader';
import useGetUserConfig from '../../../../hooks/useGetUserConfig';
import { getSubheaderStateClass } from './helpers';

export function SubHeader({ children }) {
    const { sticky } = useStickyHeader();
    const { isSubscribed } = useGetUserConfig();

    const stateClass = getSubheaderStateClass({ sticky, isSubscribed });

    const classNameSubHeader = cx(
        'py-12 h-53 flex gap-24 jc-center ai-center jc-start_lg border border-bottom border-thin border-light-100 bg-light-1 lg-none',
        stateClass
    );

    return (
        <CommonSubheader className={classNameSubHeader}>
            {children}
        </CommonSubheader>
    );
}

SubHeader.propTypes = {
    children: PropTypes.node.isRequired
};
