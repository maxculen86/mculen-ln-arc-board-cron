import { fontFaceLn10 } from '../../features/LN-10-global/fontFace/default';
import sitePropertiesLN from '../../../properties/sites/la-nacion-ar';
import { fontFaceFoodit } from '../../features/foodit-global/common/fontFace/foodit';
import get from '../../private/common/utils/get';

const { layoutsName: layoutsNameLN = {} } = sitePropertiesLN || {};

// TODO: realizar cambio de lugar de los estilos critical-internas, quedo en amp para facilitar el minificado del mismo sin tocar webpack.
export const criticalCssPathsBySite = {
    'la-nacion-ar': {
        [layoutsNameLN.HomeLN10]: `resources/packages/css/${layoutsNameLN.HomeLN10}-critical.min.css`,
        default: 'resources/dist/css/ln/amp/critical-internas.css'
    },
    ott: {
        default: ''
    },
    foodit: {
        default: ''
    }
};

export const cssPathsBySiteAndLayout = {
    'la-nacion-ar': {
        [layoutsNameLN.HomeLN10]: `resources/packages/css/${layoutsNameLN.HomeLN10}.min.css`,
        default: ''
    },
    foodit: {
        default: 'resources/packages/css/@ln/foodit-ui-logo/index.css'
    },
    ott: {
        default: ''
    }
};

export const stylesFormat = (fonts = '', styles = '') => `${fonts}${styles}`;

export const fontsBySite = (contextPath, deployment) => {
    return {
        'la-nacion-ar': fontFaceLn10({
            contextPath,
            deployment
        }),
        ott: '',
        foodit: fontFaceFoodit({
            contextPath,
            deployment
        })
    };
};

export const createLinkTag = ({
    contextPath,
    cssPathsBySiteAndLayout,
    deployment,
    layout = '',
    arcSite = ''
}) => {
    const tagLink = document.createElement('link');
    const path =
        get(cssPathsBySiteAndLayout, `${arcSite}.${layout}`, '') ||
        get(cssPathsBySiteAndLayout, `${arcSite}.default`, '');
    if (!path) return;

    tagLink.rel = 'stylesheet';
    tagLink.type = 'text/css';
    tagLink.id = 'fusion-output-type-styles';
    tagLink.href = deployment(`${contextPath}/${path}`);

    document.head.appendChild(tagLink);
};
