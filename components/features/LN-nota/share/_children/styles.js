import { cva } from '@ln/cva';

export const buildSecondButtonsGroupVariants = cva(
    'second-buttons-group flex ai-center gap-16 gap-24_m md:gap-[24px]',
    {
        variants: {
            orientation: {
                horizontal: '',
                vertical: 'flex-column_l ai-center_max1023 jc-center_l'
            }
        }
    }
);
