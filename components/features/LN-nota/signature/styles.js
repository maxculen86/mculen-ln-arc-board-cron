import { cva } from '@ln/cva';
import {
    VIDEO_VERTICAL,
    CARDS,
    Subtypes
} from '../../../private/common/utils/subtypes/subtypeHelper';
import { place } from '../../../private/common/utils/firmaHelper';

const subtypes = Subtypes.map(({ id }) => id);
const subtypesNotVertical = subtypes.filter(id => id !== VIDEO_VERTICAL);
const subtypesNotCards = subtypes.filter(id => id !== CARDS);

export const signatureClasses = cva(
    ['signature', 'flex flex-column', 'container-center-100', 'brand-color'],
    {
        variants: {
            position: {
                [place.Top]: '',
                [place.Bottom]: ''
            },
            subtype: subtypes
        },
        compoundVariants: [
            {
                position: place.Top,
                subtype: subtypesNotVertical,
                className: ['mb-16', 'mb-24_m']
            },
            {
                subtype: [VIDEO_VERTICAL],
                className: 'mb-16_md'
            }
        ]
    }
);

export const signatureWithAuthorsClasses = cva(
    [
        'signature-with-authors',
        'flex flex-wrap',
        'flex-column flex-row_m',
        'ai-center_m ai-start ',
        'gap-16',
        'w-100',
        'w-full'
    ],
    {
        variants: {
            position: {
                [place.Top]: '',
                [place.Bottom]: ''
            },
            subtype: subtypes,
            withAuthorRole: {
                true: '',
                false: ''
            },
            isNotaFooter: {
                true: '',
                false: ''
            }
        },
        compoundVariants: [
            {
                position: place.Top,
                withAuthorRole: false,
                subtype: subtypesNotVertical,
                className: 'mb-16'
            },
            {
                position: place.Bottom,
                subtype: subtypesNotCards,
                isNotaFooter: false,
                className: 'mb-32'
            }
        ]
    }
);
