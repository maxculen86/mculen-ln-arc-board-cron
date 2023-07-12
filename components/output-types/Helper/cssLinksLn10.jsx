/* eslint-disable react/prop-types */
import React from 'react';

const CssLinksLn10 = props => {
    const { CssLinks, isLN10, deployment, contextPath } = props;

    const CssHomeLN10 = (
        <link
            id="fusion-output-type-styles"
            rel="stylesheet"
            type="text/css"
            href={deployment(
                `${contextPath}/resources/packages/css/homeln10-style.min.css`
            )}
        />
    );
    return isLN10 ? CssHomeLN10 : <CssLinks />;
};
export default CssLinksLn10;
