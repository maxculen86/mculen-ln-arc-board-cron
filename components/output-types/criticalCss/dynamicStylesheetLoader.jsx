import React from 'react';
import { useEffect } from 'react';
import { cssPathsByLayout } from './helpers';
import { createLinkTag } from './helpers';

export const DynamicStylesheetLoader = ({
    contextPath,
    deployment,
    layout
}) => {
    useEffect(() => {
        createLinkTag({
            contextPath,
            cssPathsByLayout,
            deployment,
            layout
        });
    });
    return <></>;
};

export default DynamicStylesheetLoader;
