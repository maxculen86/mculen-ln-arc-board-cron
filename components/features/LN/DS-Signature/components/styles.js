import { cva } from '@ln/ds-cva';
import { place } from '../../../../private/common/utils/firmaHelper';

export const signatureVariants = cva('flex flex-column gap-16', {
    variants: {
        position: {
            [place.Top]: '',
            [place.Bottom]: ''
        },
        bioCustomSpacing: {
            true: '',
            false: ''
        }
    },
    compoundVariants: [
        {
            bioCustomSpacing: false,
            position: [place.Top],
            className: 'mb-16'
        },
        {
            bioCustomSpacing: false,
            position: [place.Bottom],
            className: 'mb-24 md:mb-64'
        },
        {
            bioCustomSpacing: true,
            position: [place.Bottom],
            className: 'mt-16'
        }
    ]
});
