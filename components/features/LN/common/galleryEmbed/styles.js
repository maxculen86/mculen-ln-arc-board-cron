import { cva } from '@ln/ds-cva';

export const galleryGridVariant = cva('grid gap-16', {
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
                md:grid-cols-12 md:[&>*]:col-span-6 md:[&>*]:col-start-4 md:[&>*]:max-w-482 md:[&>*]:mx-auto
                lg:[&>*]:max-w-615
                xl:[grid-template-columns:repeat(14,minmax(0,1fr))] xl:[&>*]:col-span-8 xl:[&>*]:col-start-4 xl:[&>*]:max-w-629
            `
        }
    }
});

export const galleryContainerVariant = cva('', {
    variants: {
        isFotoAl100Flag: {
            true: '',
            false: 'mx-auto w-full max-w-1340 lg:px-16'
        }
    }
});

export const galleryEmbedItemVariant = cva('gallery-embed__item', {
    variants: {
        isFotoAl100Flag: {
            true: 'col-span-full',
            false: 'col-span-full xl:px-58 2xl:col-start-2 2xl:col-end-16 2xl:px-0'
        }
    }
});
