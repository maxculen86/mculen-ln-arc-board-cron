import React from 'react';
import Consumer from 'fusion:consumer';
import BreadCrumbArticle from '../../private/LN/nota/breadcrumb/breadcrumbArticle';
import StaticContent from '../../private/common/staticContent';

// TODO testear staticContent, migrar test de enzyme

const breadCrumbArticle = props => {
    return (
        <StaticContent>
            <BreadCrumbArticle {...props} />
        </StaticContent>
    );
};

breadCrumbArticle.label = 'LN-Nota-Breadcrumb';

export default Consumer(breadCrumbArticle);
