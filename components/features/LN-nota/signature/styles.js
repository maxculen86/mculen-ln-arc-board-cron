import { cva } from '@ln/cva';
import {
    VIDEO_VERTICAL,
    CARDS,
    Subtypes
} from '../../../private/common/utils/subtypes/subtypeHelper';
import { place } from '../../../private/common/utils/firmaHelper';

export const signatureClasses = cva(
    ['signature', 'flex flex-column', 'container-center-100', 'brand-color'],
    {
        compoundVariants: [
            {
                position: place.Top,
                subtype: Subtypes.filter(
                    ({ id }) => parseInt(id, 10) !== VIDEO_VERTICAL
                ).map(({ id }) => parseInt(id, 10)),
                className: 'mb-16 mb-24_m'
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
        'w-100'
    ],
    {
        compoundVariants: [
            {
                position: place.Top,
                withAuthorRole: false,
                subtype: Subtypes.filter(
                    ({ id }) => parseInt(id, 10) !== VIDEO_VERTICAL
                ).map(({ id }) => parseInt(id, 10)),
                className: 'mb-16'
            },
            {
                position: place.Bottom,
                subtype: Subtypes.filter(
                    ({ id }) => parseInt(id, 10) !== CARDS
                ).map(({ id }) => parseInt(id, 10)),
                isNotaFooter: false,
                className: 'mb-32'
            }
        ]
    }
);
