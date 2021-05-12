//Familia, tamaño y peso de fuentes

// Font family
export const getFontFamily = font => {
    switch (font) {
        case 'arial':
            return '--arial';
        case 'roboto':
            return '--roboto';
        case 'georgia':
            return '--georgia';
        case 'sueca':
            return '--sueca';
        default:
            return font;
    }
};

// Font size
export const getFontSize = size => {
    switch (size) {
        case '6xs':
            return '--sixxs';
        case '5xs':
            return '--fivexs';
        case '4xs':
            return '--fourxs';
        case '3xs':
            return '--threexs';
        case '2xs':
            return '--twoxs';
        case 'xs':
            return '--xs';
        case 's':
            return '--s';
        case 'm':
            return '--m';
        case 'l':
            return '--l';
        case 'xl':
            return '--xl';
        case '2xl':
            return '--twoxl';
        case '3xl':
            return '--threexl';
        default:
            return size;
    }
};

// Font weight
export const getFontWeight = weight => {
    switch (weight) {
        case 'thin':
            return '--font-thin';
        case 'light':
            return '--font-light';
        case 'regular':
            return '--font-regular';
        case 'medium':
            return '--font-medium';
        case 'bold':
            return '--font-bold';
        case 'black':
            return '--font-black';
        default:
            return weight;
    }
};
