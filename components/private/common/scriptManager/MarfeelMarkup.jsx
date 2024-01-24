import React from 'react';
import { useAppContext } from 'fusion:context';

const MarfeelMarkup = () => {
    const { contextPath, deployment, globalContent } = useAppContext();
    const {
        content_restrictions: { content_code }
    } = globalContent;
    const isAccessibleForFree = content_code !== 'cerrada';

    const schemaOrgData = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        isAccessibleForFree
    };

    const schemaOrgJsonString = JSON.stringify(schemaOrgData, null, 2);

    return (
        <>
            <script
                id="scriptMarfeelMarkup"
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/scriptMarfeelMarkup.min.js`
                )}
            />
            <script type="application/ld+json" text={schemaOrgJsonString} />
        </>
    );
};

export default MarfeelMarkup;
