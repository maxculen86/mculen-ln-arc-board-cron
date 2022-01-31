import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import BreadCrumbArticle from '../../private/LN/nota/breadcrumb/breadcrumbArticle';
import StaticValidation from '../../private/common/staticValidation';

const breadCrumbArticle = props => {
    const { id: featureId } = props;
    return (
        <StaticValidation id={featureId}>
            <BreadCrumbArticle {...props} />
        </StaticValidation>
    );
};
breadCrumbArticle.propTypes = {
    id: PropTypes.string.isRequired
};

breadCrumbArticle.label = 'LN-Nota-Breadcrumb';

export default Consumer(breadCrumbArticle);
