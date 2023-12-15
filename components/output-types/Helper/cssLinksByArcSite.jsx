import React from 'react';
import { useAppContext } from 'fusion:context';

const CssLinksByArcSite = () => {
    const { contextPath, deployment, arcSite } = useAppContext();

    return (
        <link
            id="fusion-output-type-styles"
            rel="stylesheet"
            type="text/css"
            href={deployment(`${contextPath}/dist/css/site-${arcSite}.css`)}
        />
    );
};
export default CssLinksByArcSite;
