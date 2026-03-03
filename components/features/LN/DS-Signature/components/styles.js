import { cva } from '@ln/ds-cva';
import { place } from '../../../../private/common/utils/firmaHelper';

export const signatureVariants = cva('flex flex-column gap-16', {
    variants: {
        position: {
            [place.Top]: 'mb-16'
        }
    }
});
