import React from 'react';
import { useAppContext } from 'fusion:context';

const CssLinksRecetas = () => {
    const { contextPath, deployment } = useAppContext();

    return (
        <link
            id="fusion-output-type-styles"
            rel="stylesheet"
            type="text/css"
            href={deployment(`${contextPath}/dist/css/site-recetas.css`)}
        />
    );
};
export default CssLinksRecetas;
