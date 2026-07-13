import React from 'react';
import { useAppContext } from 'fusion:context';

function AmazonPublisherServices({ location = 'head' }) {
    const { contextPath, deployment } = useAppContext();

    return (
        location === 'head' && (
            <script
                id="scriptAmazonPublisherServices"
                async
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/scriptAmazonPublisherServices.min.js`
                )}
            />
        )
    );
}

export default AmazonPublisherServices;
