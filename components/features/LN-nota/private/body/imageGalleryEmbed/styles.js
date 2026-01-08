import { cva } from '@ln/ds-cva';

export const galleryGridVariant = cva('grid gap-[16px]', {
    variants: {
        diagram: {
            'wide-single': '',
            'two-side-by-side': 'md:grid-cols-2',
            'three-one-top-two-bottom':
                'md:[grid-template-columns:repeat(2,minmax(0,1fr))] md:[grid-template-rows:auto_auto] md:[&>*:first-child]:[grid-column:1/3]',
            'three-two-top-one-bottom': `
                [&>*:nth-child(1)]:order-3
                [&>*:nth-child(2)]:order-1
                [&>*:nth-child(3)]:order-2
                md:[grid-template-columns:repeat(2,minmax(0,1fr))]
                md:[grid-template-rows:auto_auto]
                md:[grid-template-areas:'top-left_top-right''bottom_bottom']
                md:[&>*:nth-child(1)]:[grid-area:bottom]
                md:[&>*:nth-child(2)]:[grid-area:top-left]
                md:[&>*:nth-child(3)]:[grid-area:top-right]
            `,
            'four-grid': 'md:grid-cols-2 md:grid-rows-2',
            'panoramic-top':
                'md:[grid-template-columns:repeat(3,minmax(0,1fr))] md:[grid-template-rows:auto_auto] md:[&>*:first-child]:[grid-column:1/4]',
            'large-left': `
                md:grid-cols-[2fr_1fr]
                md:grid-rows-2
                md:[&>*]:w-full md:[&>*]:h-full
                md:[&>*:first-child]:row-span-2
                md:[&>*:first-child]:col-start-1
                md:[&>*:not(:first-child)]:col-start-2
            `,
            'vertical-two': '[&>img]:aspect-[2/3] md:grid-cols-2',
            'vertical-three': '[&>img]:aspect-[2/3] md:grid-cols-3',
            'vertical-single-centered': `
                [&>img]:aspect-[2/3]
                md:grid-cols-12 md:[&>*]:col-span-6 md:[&>*]:col-start-4 md:[&>*]:max-w-[482px] md:[&>*]:mx-auto
                lg:[&>*]:max-w-[615px]
                xl:[grid-template-columns:repeat(14,minmax(0,1fr))] xl:[&>*]:col-span-8 xl:[&>*]:col-start-4 xl:[&>*]:max-w-[629px]
            `
        }
    }
});

export const galleryContainerVariant = cva('', {
    variants: {
        isFotoAl100Flag: {
            true: '',
            false: 'container lay px-0 px-16_l'
        }
    }
});

export const galleryEmbedItemVariant = cva('gallery-embed__item', {
    variants: {
        isFotoAl100Flag: {
            true: 'grid-col-1',
            false: 'grid-col-1 grid-col-2-12_md grid-col-1-1_lg px-58_lg grid-col-2-16_min1366 px-0_min1366'
        }
    }
});
