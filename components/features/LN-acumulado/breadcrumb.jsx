/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Breadcrumb from '../../private/LN/acumulado/breadcrumb';
import StaticContent from '../../private/common/staticContent';

const BreadcrumbFeature = props => {
    return (
        <StaticContent>
            <Breadcrumb {...props} />
        </StaticContent>
    );
};

BreadcrumbFeature.label = 'LN-Acumulado-Breadcrumb';

export default BreadcrumbFeature;
