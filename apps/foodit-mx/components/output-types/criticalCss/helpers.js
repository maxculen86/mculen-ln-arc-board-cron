import { fontFaceFoodit } from '../../features/foodit-global/common/fontFace/foodit';
import get from '../../private/common/utils/get';

export const criticalCssPathsBySite = {
    foodit: {
        default: 'resources/dist/css/foodit/base/index.css'
    }
};

export const cssPathsBySiteAndLayout = {
    foodit: {
        default: 'resources/packages/css/@ln/foodit-ui-logo/index.css'
    }
};

export const stylesFormat = (fonts = '', styles = '') => `${fonts}${styles}`;

export const fontsBySite = (contextPath, deployment) => ({
    foodit: fontFaceFoodit({
        contextPath,
        deployment
    })
});

export const createLinkTag = ({
    contextPath,
    layoutStylePaths,
    deployment,
    layout = '',
    arcSite = ''
}) => {
    const tagLink = document.createElement('link');
    const path =
        get(layoutStylePaths, `${arcSite}.${layout}`, '') ||
        get(layoutStylePaths, `${arcSite}.default`, '');
    if (!path) return;

    tagLink.rel = 'stylesheet';
    tagLink.type = 'text/css';
    tagLink.id = 'fusion-output-type-styles';
    tagLink.href = deployment(`${contextPath}/${path}`);

    document.head.appendChild(tagLink);
};
