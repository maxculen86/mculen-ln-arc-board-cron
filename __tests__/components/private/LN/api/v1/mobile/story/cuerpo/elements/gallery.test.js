import ArticleGallery from '../../../../../../../../../../__mocks__/data/nota/cuerpo/gallery/gallery.json';
import ArticleGalleryNoImages from '../../../../../../../../../../__mocks__/data/nota/cuerpo/gallery/galleryNoImages.json';

import Gallery from '../../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/gallery';
import dateAndTimeUtil, {
    dateAndTimeForAppsUtil
} from '../../../../../../../../../../components/private/common/utils/dateAndTimeUtil';

describe('Test de la galeria en el cuerpo de una nota', () => {
    it('Test de galerias si es null', () => {
        const resp = Gallery(null);
        expect(resp).toBe(null);
    });

    it('Test si la galeria no contiene imagenes', () => {
        const resp = Gallery(ArticleGalleryNoImages);
        expect(resp).toBe(null);
    });

    it('Test si las imagenes tienen la misma cantidad que el json original', () => {
        const resp = Gallery(ArticleGallery);
        expect(resp['images']).toHaveLength(
            ArticleGallery.content_elements.length
        );
    });

    it('Test de valores de la galeria', () => {
        const resp = Gallery(ArticleGallery);

        expect(resp['_t']).toBe('gallery');
        expect(resp['title']).toBe(ArticleGallery.headlines.basic);
        expect(resp['date']).toBe(
            dateAndTimeForAppsUtil(ArticleGallery.publish_date)
        );
    });

    test('Test Fecha del articulo dateAndTimeUtil', () => {
        expect(dateAndTimeUtil(ArticleGallery.publish_date)).toEqual({
            date: '27 de abril de 2020',
            time: '17:32'
        });
    });
});
