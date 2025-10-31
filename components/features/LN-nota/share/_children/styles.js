import { cva } from '@ln/cva';

export const buildSecondButtonsGroupVariants = cva(
    'second-buttons-group flex ai-center gap-8 gap-24_m',
    {
        variants: {
            orientation: {
                horizontal: 'pl-8',
                vertical:
                    'flex-column_l pl-8_max1023 ai-center_max1023 jc-center_l pt-16_l'
            }
        }
    }
);
