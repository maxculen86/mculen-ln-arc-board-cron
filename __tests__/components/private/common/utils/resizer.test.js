import {
    createResizer,
    resizeArcImage
} from '../../../../../components/private/common/utils/image/resizer';
import nota from '../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM.json';

describe('LN - Common - Utils - Imagen - Resizer', () => {
    it('Test de resizeo', () => {
        const resizer = createResizer(
            'Fmkgru2rZ2uPZ5wXs7B2HbVDHS2SZuA7',
            'http://demo-prod.origin.arcpublishing.com/resizer'
        );

        const newNota = resizeArcImage(
            nota.promo_items.basic,
            {
                big: {
                    width: 200,
                    height: 123,
                    media: '(min-width: 768px)',
                    class: 'img-desktop',
                    type: 'apertura'
                },
                medium: {
                    width: 150,
                    height: 175,
                    media: '(min-width: 240px)',
                    class: 'img-desktop-sm',
                    type: 'apertura'
                }
            },
            resizer
        );

        console.log('resized urls---------------------', newNota.resized_urls);
    });
});
