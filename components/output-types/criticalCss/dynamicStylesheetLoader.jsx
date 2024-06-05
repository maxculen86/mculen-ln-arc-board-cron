import React from 'react';
import { useEffect } from 'react';
import { cssPathsBySiteAndLayout } from './helpers';
import { createLinkTag } from './helpers';

export const DynamicStylesheetLoader = ({
    contextPath,
    deployment,
    layout,
    arcSite
}) => {
    useEffect(() => {
        createLinkTag({
            contextPath,
            cssPathsBySiteAndLayout,
            deployment,
            layout,
            arcSite
        });
    });
    return <></>;
};

export default DynamicStylesheetLoader;
