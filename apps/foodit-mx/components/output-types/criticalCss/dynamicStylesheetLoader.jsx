import { useEffect } from 'react';

import { cssPathsBySiteAndLayout, createLinkTag } from './helpers';

function DynamicStylesheetLoader({ contextPath, deployment, layout, arcSite }) {
    useEffect(() => {
        createLinkTag({
            contextPath,
            layoutStylePaths: cssPathsBySiteAndLayout,
            deployment,
            layout,
            arcSite
        });
    });
    return null;
}
export default DynamicStylesheetLoader;
