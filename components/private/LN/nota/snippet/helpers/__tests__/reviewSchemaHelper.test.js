jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

import { getReviewSchemaData } from '../reviewSchemaHelper';

const baseReviewData = {
    reviewUrl: 'https://www.lanacion.com.ar/espectaculos/test-review-nid123/',
    headline: 'Titulo de la review',
    author: {
        '@type': 'Person',
        name: 'Test Author'
    },
    datePublished: '2026-04-22T10:00:00.000Z',
    ratingValue: 4
};

const getItemReviewed = canonicalUrl =>
    getReviewSchemaData({
        ...baseReviewData,
        canonicalUrl
    })['@graph'][0].itemReviewed;

describe('reviewSchemaHelper', () => {
    describe('getReviewSchemaData', () => {
        it('uses Movie review item type for cine articles', () => {
            const canonicalUrl =
                'https://www.lanacion.com.ar/espectaculos/cine/barbie-la-pelicula-nid11032026/';

            expect(getItemReviewed(canonicalUrl)).toEqual({
                '@type': 'Movie',
                name: baseReviewData.headline
            });
        });

        it('uses MusicEvent review item type for musica articles', () => {
            const canonicalUrl =
                'https://www.lanacion.com.ar/espectaculos/musica/lollapalooza-el-festival-que-revoluciona-la-musica-global-nid25032025/';

            expect(getItemReviewed(canonicalUrl)).toEqual({
                '@type': 'MusicEvent',
                name: baseReviewData.headline
            });
        });

        it('uses TheaterEvent review item type for teatro articles', () => {
            const canonicalUrl =
                'https://www.lanacion.com.ar/espectaculos/teatro/pedro-alfonso-con-la-llegada-del-coronavirus-se-me-fue-la-creatividad-nid28102021/';

            expect(getItemReviewed(canonicalUrl)).toEqual({
                '@type': 'TheaterEvent',
                name: baseReviewData.headline
            });
        });

        it('uses TVSeries review item type for series de tv articles', () => {
            const canonicalUrl =
                'https://www.lanacion.com.ar/espectaculos/series-de-tv/netflix-nuevas-temporadas-de-atiye-lupin-y-elite-nid22042026/';

            expect(getItemReviewed(canonicalUrl)).toEqual({
                '@type': 'TVSeries',
                name: baseReviewData.headline
            });
        });

        it('uses CreativeWork as default when article section does not have a specific type', () => {
            const canonicalUrl =
                'https://www.lanacion.com.ar/espectaculos/danza/el-duende-de-la-danza-nid301916/';

            expect(getItemReviewed(canonicalUrl)).toEqual({
                '@type': 'CreativeWork',
                name: baseReviewData.headline
            });
        });

        it('uses CreativeWork as default when canonical url is empty', () => {
            expect(getItemReviewed('')).toEqual({
                '@type': 'CreativeWork',
                name: baseReviewData.headline
            });
        });

        it('uses CreativeWork as default when canonical url is invalid', () => {
            expect(getItemReviewed(null)).toEqual({
                '@type': 'CreativeWork',
                name: baseReviewData.headline
            });
        });
    });
});
