import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';

function AmazonPublisherServices({ location = 'head' }) {
    const { contextPath, deployment } = useAppContext();

    return (
        location === 'head' && (
            <>
                <script
                    id="scriptAmazonPublisherServices"
                    async
                    type="text/javascript"
                    src={deployment(
                        `${contextPath}/resources/js/LN/scriptAmazonPublisherServices.min.js`
                    )}
                />
            </>
        )
    );
}

AmazonPublisherServices.propTypes = { location: PropTypes.string.isRequired };

export default AmazonPublisherServices;
