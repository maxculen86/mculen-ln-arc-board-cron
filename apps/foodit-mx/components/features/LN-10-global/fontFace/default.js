import { FONT_PRUMO, FONT_PRUMO_ITALIC } from 'fusion:environment';
import getWebFont from '../../../private/common/utils/getWebFont';

export const fontFaceLn10 = ({ contextPath, deployment }) => `
@font-face {font-family:'Prumo';src:url('${getWebFont({
    font: FONT_PRUMO,
    contextPath,
    deployment
})}') format('woff2-variations'); font-weight: 90; font-display: swap;}
@font-face {font-family:'Prumo Italic';src:url('${getWebFont({
    font: FONT_PRUMO_ITALIC,
    contextPath,
    deployment
})}') format('woff2-variations'); font-weight: 90; font-display: swap;}
`; // NOSONAR;
