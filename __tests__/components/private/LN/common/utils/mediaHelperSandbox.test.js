import { wikiImagesWithWWW } from '../../../../../../components/private/LN/common/utils/mediaHelper';
import wikiSourceData from '../../../../../../__mocks__/data/wikiTag/wikiSourceData.json';

jest.mock(
    'fusion:environment',
    () => ({
        __esModule: true,
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://sandbox.lanacion.com.ar'
    }),
    { virtual: true }
);

describe('Private - LN - Common - Utils -> mediaHelper - sandbox', () => {
    describe('wikiImagesWithWWW util', () => {
        test('should keep Wiki productive resized images with www in sandbox', () => {
            const imagesWithWWW = wikiImagesWithWWW(wikiSourceData);

            imagesWithWWW.forEach(({ resizedUrl }) => {
                expect(resizedUrl).toContain(
                    'https://www.lanacion.com.ar/resizer'
                );
                expect(resizedUrl).not.toContain(
                    'https://sandbox.lanacion.com.ar/resizer'
                );
            });
        });
    });
});
