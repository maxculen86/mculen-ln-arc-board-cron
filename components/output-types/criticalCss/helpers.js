import { fontFaceLn10 } from '../../features/LN-10-global/fontFace/default';
import sitePropertiesLN from '../../../properties/sites/la-nacion-ar';
import { fontFaceFoodit } from '../../features/foodit-global/common/fontFace/foodit';
import get from '../../private/common/utils/get';

const { layoutsName: layoutsNameLN = {} } = sitePropertiesLN || {};

export const criticalCssPathsBySite = {
    'la-nacion-ar': {
        [layoutsNameLN.HomeLN10]:
            'resources/dist/css/ln/pages/ln10-home-critical.css',
        [layoutsNameLN.NotaOpinion]: '',
        default: 'resources/dist/css/ln/pages/critical-internas.css'
    },
    foodit: {
        default: 'resources/dist/css/foodit/base/index.css'
    }
};

export const cssPathsBySiteAndLayout = {
    'la-nacion-ar': {
        [layoutsNameLN.HomeLN10]:
            'resources/dist/css/ln/pages/ln10-home-main.css',
        default: ''
    },
    foodit: {
        default: 'resources/packages/css/@ln/foodit-ui-logo/index.css'
    }
};

export const stylesFormat = (fonts = '', styles = '') => `${fonts}${styles}`;

export const fontsBySite = (contextPath, deployment) => ({
    'la-nacion-ar': fontFaceLn10({
        contextPath,
        deployment
    }),
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
