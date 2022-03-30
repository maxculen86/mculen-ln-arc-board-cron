// Familia, tamaño y peso de fuentes

// Font family
export const fonts = {
    arial: '--arial',
    georgia: '--georgia',
    sueca: '--sueca'
};

export const getFontFamily = font => fonts[font] || font;

// Font size
export const sizes = {
    '6xs': '--sixxs',
    '5xs': '--fivexs',
    '4xs': '--fourxs',
    '3xs': '--threexs',
    '2xs': '--twoxs',
    xs: '--xs',
    small: '--s',
    medium: '--m',
    large: '--l',
    xl: '--xl',
    '2xl': '--twoxl',
    '3xl': '--threexl'
};

export const getFontSize = size => sizes[size] || size;

// Font weight
export const weights = {
    thin: '--font-thin',
    light: '--font-light',
    regular: '--font-regular',
    medium: '--font-medium',
    bold: '--font-bold',
    black: '--font-black'
};

export const getFontWeight = weight => weights[weight] || weight;
