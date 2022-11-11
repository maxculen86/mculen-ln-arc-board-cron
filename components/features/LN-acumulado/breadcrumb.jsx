/* eslint-disable react/jsx-props-no-spreading */
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import React from 'react';

import Breadcrumb from '../../private/LN/acumulado/breadcrumb';
import checkHydrateOnly from '../../private/LN/common/utils/checkHydrateOnly';

const BreadcrumbFeature = props => {
    const {
        globalContent: { node_type: nodeType }
    } = useAppContext();

    const hasHydrateOnly = checkHydrateOnly({ nodeType });

    return !hasHydrateOnly ? (
        <Static>
            <Breadcrumb {...props} />
        </Static>
    ) : (
        <Breadcrumb {...props} />
    );
};

BreadcrumbFeature.label = 'LN-Acumulado-Breadcrumb';

export default BreadcrumbFeature;
