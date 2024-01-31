import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';

const MarfeelMarkup = () => {
    const { contextPath, deployment, globalContent } = useAppContext();
    const contentCode = get(
        globalContent,
        'content_restrictions.content_code',
        ''
    );

    const isAccessibleForFree = contentCode !== 'cerrada';
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
