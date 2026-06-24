import { ROBOTO_REGULAR, FONT_PRUMO } from 'fusion:environment';
import getWebFont from '../../../../private/common/utils/getWebFont';

export const fontFaceFoodit = ({ contextPath, deployment }) => `
@font-face {font-family:'Roboto';src:url('${getWebFont({
    font: ROBOTO_REGULAR,
    contextPath,
    deployment
})}') format('woff2'); font-weight: 400; font-display: swap;}
@font-face {font-family:'Prumo';src:url('${getWebFont({
    font: FONT_PRUMO,
    contextPath,
    deployment
})}') format('woff2'); font-weight: 90; font-display: swap;}
`;
