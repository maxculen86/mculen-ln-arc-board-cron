/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Static from 'fusion:static';

import Breadcrumb from '../../private/LN/acumulado/breadcrumb';

const BreadcrumbFeature = props => {
    const { id: featureId } = props;
    return (
        <Static id={featureId}>
            <Breadcrumb {...props} />
        </Static>
    );
};

BreadcrumbFeature.label = 'LN-Acumulado-Breadcrumb';

export default BreadcrumbFeature;
