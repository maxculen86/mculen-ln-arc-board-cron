import { cva } from '@ln/cva';
import {
    FOTOAL100,
    LIVEBLOG_EDITORIAL,
    VIDEO,
    CARDS,
    VIDEO_VERTICAL,
    VIDEO_COMENTARIOS
} from '../../../../private/common/utils/subtypes/subtypeHelper';

export const shareContainerVariant = cva('', {
    variants: {
        sticky: {
            true: 'sticky float-l_l z-101 transition transition-all transition-duration-250 top-73_min1024'
        },
        subtype: {
            fotoAl100:
                'float-l_l transition transition-all transition-duration-250',
            liveblogEditorial: 'border-transparent py-24_m',
            cards: 'border-transparent mt-8'
        }
    },
    compoundVariants: [
        {
            subtype: ['video', 'videoVertical'],
            className: 'ratio-auto order-initial_min1024'
        },
        {
            subtype: ['fotoAl100', 'liveblogEditorial', 'cards'],
            className:
                'border border-bottom border-thin border-neutral-light-100 border-0_l'
        }
    ],
    defaultVariants: {
        sticky: true,
        subtype: ''
    }
});

export const layoutBySubtype = {
    [FOTOAL100]: 'fotoAl100',
    [VIDEO]: 'video',
    [LIVEBLOG_EDITORIAL]: 'liveblogEditorial',
    [CARDS]: 'cards',
    [VIDEO_VERTICAL]: 'videoVertical',
    [VIDEO_COMENTARIOS]: 'video'
};

export const subtypesWithHorizontalShare = [
    VIDEO,
    LIVEBLOG_EDITORIAL,
    CARDS,
    VIDEO_VERTICAL,
    VIDEO_COMENTARIOS
];

export const negativeSubtypes = [VIDEO, VIDEO_VERTICAL, VIDEO_COMENTARIOS];

const subtypesWithoutSticky = [
    VIDEO,
    LIVEBLOG_EDITORIAL,
    FOTOAL100,
    CARDS,
    VIDEO_COMENTARIOS
];

export const hasSticky = subtype => !subtypesWithoutSticky.includes(subtype);
