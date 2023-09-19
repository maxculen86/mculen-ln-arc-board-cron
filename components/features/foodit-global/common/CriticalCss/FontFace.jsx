import getWebFont from '../../../../private/common/utils/getWebFont';
import {
    FONT_PRUMO,
    ROBOTO_LIGHT,
    ROBOTO_REGULAR,
    ROBOTO_MEDIUM,
    ROBOTO_BOLD
} from 'fusion:environment';

//TODO: Cargar diferidas las fuentes que no necesitamos en el primer viewport. Falta definicion de diseño y prod.

export const FontFaceFoodit = ({ contextPath, deployment }) => `
@font-face {font-family:'Prumo';src:url('${getWebFont({
    font: FONT_PRUMO,
    contextPath,
    deployment
})}') format('woff2-variations'); font-weight: 90; font-display: swap;}
@font-face {font-family:'Roboto';src:url('${getWebFont({
    font: ROBOTO_LIGHT,
    contextPath,
    deployment
})}') format('woff2-variations'); font-weight: 300; font-display: swap;}
@font-face {font-family:'Roboto';src:url('${getWebFont({
    font: ROBOTO_REGULAR,
    contextPath,
    deployment
})}') format('woff2-variations'); font-weight: 400; font-display: swap;}
@font-face {font-family:'Roboto';src:url('${getWebFont({
    font: ROBOTO_MEDIUM,
    contextPath,
    deployment
})}') format('woff2-variations'); font-weight: 500; font-display: swap;}
@font-face {font-family:'Roboto';src:url('${getWebFont({
    font: ROBOTO_BOLD,
    contextPath,
    deployment
})}') format('woff2-variations'); font-weight: 700; font-display: swap;}
`;
