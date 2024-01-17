import React from 'react';
import { useAppContext } from 'fusion:context';

const MarfeelMarkup = () => {
    const { contextPath, deployment, globalContent } = useAppContext();
    const {
        content_restrictions: { content_code }
    } = globalContent;
    const isAccessibleForFree = content_code !== 'cerrada';

    return (
        <script
            id="scriptMarfeelMarkup"
            data-schema={JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'NewsArticle',
                isAccessibleForFree
            })}
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptMarfeelMarkup.min.js`
            )}
        />
    );
};

export default MarfeelMarkup;
