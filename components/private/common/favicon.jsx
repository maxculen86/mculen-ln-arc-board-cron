import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';

const Favicon = props => {
    const { contextPath, deployment } = useAppContext();

    return (
        <>
            <link
                rel="shortcut icon"
                type="image/x-icon"
                href={deployment(`${contextPath}/resources/images/favicon.ico`)}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href={deployment(
                    `${contextPath}/resources/images/favicon-16.png`
                )}
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href={deployment(
                    `${contextPath}/resources/images/favicon-32.png`
                )}
            />
            <link
                rel="shortcut icon"
                type="image/png"
                sizes="192x192"
                href={deployment(
                    `${contextPath}/resources/images/favicon-192.png`
                )}
            />
            <link
                rel="shortcut icon"
                type="image/png"
                sizes="512x512"
                href={deployment(
                    `${contextPath}/resources/images/favicon-512.png`
                )}
            />
            <link
                rel="apple-touch-icon"
                href={deployment(
                    `${contextPath}/resources/images/favicon-192.png`
                )}
            />
            <link
                rel="apple-touch-icon"
                sizes="512x512"
                href={deployment(
                    `${contextPath}/resources/images/favicon-512.png`
                )}
            />
        </>
    );
};

Favicon.propTypes = {
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};

export default Favicon;
