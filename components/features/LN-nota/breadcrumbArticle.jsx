import React from 'react';
import Consumer from 'fusion:consumer';
import BreadCrumbArticle from '../../private/LN/nota/breadcrumb/breadcrumbArticle';
import withStatic from '../../private/common/hocs/withStatic';

const breadCrumbArticle = props => <BreadCrumbArticle {...props} />;

breadCrumbArticle.label = 'LN-Nota-Breadcrumb';

export default withStatic(Consumer(breadCrumbArticle));
