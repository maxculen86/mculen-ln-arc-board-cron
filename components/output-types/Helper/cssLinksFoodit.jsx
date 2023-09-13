import React from 'react';
import { useAppContext } from 'fusion:context';

const CssLinksFoodit = () => {
    const { contextPath, deployment } = useAppContext();

    return (
        <link
            id="fusion-output-type-styles"
            rel="stylesheet"
            type="text/css"
            href={deployment(`${contextPath}/dist/css/site-foodit.css`)}
        />
    );
};
export default CssLinksFoodit;
