import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import BreadCrumbArticle from '../../private/LN/nota/apertura/breadcrumb/breadcrumbArticle';

const breadCrumbArticle = props => {
    const { id: featureId } = props;
    return (
        <Static id={featureId}>
            <BreadCrumbArticle {...props} />
        </Static>
    );
};

breadCrumbArticle.label = 'LN-Nota-Breadcrumb';

export default Consumer(breadCrumbArticle);
