import { fontFaceLn10 } from '../../features/LN-10-global/fontFace/default';
import siteProperties from '../../../properties/sites/la-nacion-ar';

import { fontFaceFoodit } from '../../features/foodit-global/common/fontFace/foodit';

const { layoutsName = {} } = siteProperties || {};
// TODO: realizar cambio de lugar de los estilos critical-internas, quedo en amp para facilitar el minificado del mismo sin tocar webpack.
export const criticalCssPathsBySite = {
    'la-nacion-ar': {
        [layoutsName.HomeLN10]: `resources/packages/css/${layoutsName.HomeLN10}-critical.min.css`,
        default: 'resources/dist/css/ln/amp/critical-internas.css'
    },
    ott: {
        default: ''
    },
    foodit: {
        default: ''
    }
};

export const cssPathsByLayout = {
    [layoutsName.HomeLN10]: `resources/packages/css/${layoutsName.HomeLN10}.min.css`
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
    cssPathsByLayout,
    deployment,
    layout
}) => {
    const tagLink = document.createElement('link');

    tagLink.rel = 'stylesheet';
    tagLink.type = 'text/css';
    tagLink.id = 'fusion-output-type-styles';
    tagLink.href = deployment(`${contextPath}/${cssPathsByLayout[layout]}`);

    document.head.appendChild(tagLink);
};
