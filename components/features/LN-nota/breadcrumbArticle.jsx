import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import BreadCrumbArticle from '../../private/LN/nota/apertura/breadcrumb/breadcrumbArticle';

const breadCrumbArticle = props => {
    return (
        <Static id="Breadcrumb-article">
            <BreadCrumbArticle {...props} />
        </Static>
    );
};

breadCrumbArticle.label = 'LN-Nota-Breadcrumb';

export default Consumer(breadCrumbArticle);
