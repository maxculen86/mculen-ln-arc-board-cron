import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbArticle from '../../breadcrumbArticle';

function BodyTop({ children }) {
    return (
        <div
            data-testid="body-top"
            className="grid grid-row-1 grid-col-1 grid-col-2-12_m grid-col-3-11_min1023 grid-col-4-10_md grid-col-5-13_lg"
        >
            <BreadcrumbArticle className="mb-0 pb-16" />
            {children}
        </div>
    );
}

BodyTop.propTypes = {
    children: PropTypes.node.isRequired
};

export default BodyTop;
