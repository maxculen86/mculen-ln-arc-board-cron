import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import BreadCrumbArticle from '../../private/LN/nota/breadcrumb/breadcrumbArticle';

// TODO testear staticContent, migrar test de enzyme

const breadCrumbArticle = props => {
    return (
        <Static id="LN-breadcrumb-article" htmlOnly>
            <BreadCrumbArticle {...props} />
        </Static>
    );
};

breadCrumbArticle.label = 'LN-Nota-Breadcrumb';

export default Consumer(breadCrumbArticle);
