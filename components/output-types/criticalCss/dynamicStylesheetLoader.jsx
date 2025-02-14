import { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';

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
DynamicStylesheetLoader.propTypes = {
    layout: PropTypes.string.isRequired,
    arcSite: PropTypes.string.isRequired,
    contextPath: PropTypes.string.isRequired,
    deployment: PropTypes.func.isRequired
};
export default DynamicStylesheetLoader;
