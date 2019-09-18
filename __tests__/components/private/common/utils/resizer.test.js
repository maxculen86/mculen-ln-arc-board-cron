import {
    createResizer,
    resizeArcImage,
    addResizedUrls
} from '../../../../../components/private/common/utils/image/resizer';
import nota from '../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM.json';

describe('LN - Common - Utils - Imagen - Resizer', () => {
    const resizerSecret = 'Fmkgru2rZ2uPZ5wXs7B2HbVDHS2SZuA7';
    const resizerUrl = 'http://demo-prod.origin.arcpublishing.com/resizer';
    const resizer = createResizer(resizerSecret, resizerUrl);
    const presets = [
        {
            width: 200,
            height: 123,
            media: '(min-width: 768px)',
            class: 'img-desktop',
            type: 'promo_items'
        },
        {
            width: 150,
            height: 175,
            media: '(min-width: 240px)',
            class: 'img-desktop-sm',
            type: 'promo_items'
        },
        {
            width: 666,
            height: 666,
            media: '(min-width: 666px)',
            class: 'img-desktop-sm',
            type: 'content_elements'
        },
        {
            width: 123,
            height: 123,
            media: '(min-width: 123px)',
            class: 'img-desktop-sm',
            type: 'credits'
        }
    ];

    it('Test de resizeo horizontal', () => {
        const newNota = resizeArcImage(
            nota.promo_items.basic,
            presets,
            resizer
        );

        expect(newNota.resized_urls[0].resizedUrl).toBe(
            'http://demo-prod.origin.arcpublishing.com/resizer/k_-nxquhw4MOtCGTufFgn1lPu1I=/200x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/VASAYYYBLVFIJCFDSH22JS5X2Q.jpg'
        );

        expect(newNota.resized_urls[1].resizedUrl).toBe(
            'http://demo-prod.origin.arcpublishing.com/resizer/W9UakO2brdaoE3v4FIjLT1AcNyc=/150x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/VASAYYYBLVFIJCFDSH22JS5X2Q.jpg'
        );

        Object.keys(presets[0]).forEach(p => {
            expect(newNota.resized_urls[0].option[p]).toBe(presets[0][p]);
        });
    });

    it('Test de resizeo vertical', () => {
        const notaVertical = { ...nota.promo_items.basic };
        const height = notaVertical.height;
        notaVertical.height = notaVertical.width;
        notaVertical.width = height;

        const newNota = resizeArcImage(notaVertical, presets, resizer);

        expect(newNota.resized_urls[0].resizedUrl).toBe(
            'http://demo-prod.origin.arcpublishing.com/resizer/JY6c4oxLnV_X7OovdRp7KLqPhH4=/0x123/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/VASAYYYBLVFIJCFDSH22JS5X2Q.jpg'
        );
    });

    it('Test de resizeo en nota ANS', () => {
        const newNota = addResizedUrls(nota, {
            presets,
            resizerSecret,
            resizerUrl
        });

        expect(newNota.promo_items.basic.resized_urls[0].resizedUrl).toBe(
            'http://demo-prod.origin.arcpublishing.com/resizer/k_-nxquhw4MOtCGTufFgn1lPu1I=/200x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/VASAYYYBLVFIJCFDSH22JS5X2Q.jpg'
        );
        expect(newNota.promo_items.basic.resized_urls.length).toBe(2);
        Object.keys(presets[0]).forEach(p => {
            expect(newNota.promo_items.basic.resized_urls[0].option[p]).toBe(
                presets[0][p]
            );
        });

        expect(newNota.content_elements[3].resized_urls[0].resizedUrl).toBe(
            'http://demo-prod.origin.arcpublishing.com/resizer/IIUPFcivtJyCuIWSumMdf0K5y4k=/666x0/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/L6DRYSNKH5BHNHQC2CPUVQ7ILQ.png'
        );
        Object.keys(presets[0]).forEach(p => {
            expect(newNota.content_elements[3].resized_urls[0].option[p]).toBe(
                presets[2][p]
            );
        });

        expect(newNota.credits.by[0].image.resized_urls[0].resizedUrl).toBe(
            'http://demo-prod.origin.arcpublishing.com/resizer/DlXn4M5x_q0_XJHXWh7nvOi4SJ8=/0x123/s3.amazonaws.com/arc-authors/lanacionar/d9ada84c-fee5-42c8-b34f-8dc3c28ea585.png'
        );
        Object.keys(presets[3]).forEach(p => {
            expect(newNota.credits.by[0].image.resized_urls[0].option[p]).toBe(
                presets[3][p]
            );
        });
    });
});
