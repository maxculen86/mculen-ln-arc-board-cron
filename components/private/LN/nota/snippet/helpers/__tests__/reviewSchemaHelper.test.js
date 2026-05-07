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

const reviewImage =
    'https://www.lanacion.com.ar/resizer/v2/IF63X2J3BJDMFFOA7UW4XWCGLA.png?auth=07dad78ceae2be1a021893b30431541eb4840d371741624b27d39911b0750fb9&width=1200&height=800&quality=70&smart=true';

const getReviewData = canonicalUrl =>
    getReviewSchemaData({
        ...baseReviewData,
        image: reviewImage,
        canonicalUrl
    });

const getItemReviewed = canonicalUrl =>
    getReviewData(canonicalUrl)['@graph'][0].itemReviewed;

describe('reviewSchemaHelper', () => {
    describe('getReviewSchemaData', () => {
        it('uses Movie review item type for cine articles', () => {
            const canonicalUrl =
                'https://www.lanacion.com.ar/espectaculos/cine/barbie-la-pelicula-nid11032026/';

            expect(getItemReviewed(canonicalUrl)).toEqual({
                '@type': 'Movie',
                name: baseReviewData.headline,
                image: reviewImage
            });
        });

        it('uses TVSeries review item type for series de tv articles', () => {
            const canonicalUrl =
                'https://www.lanacion.com.ar/espectaculos/series-de-tv/netflix-nuevas-temporadas-de-atiye-lupin-y-elite-nid22042026/';

            expect(getItemReviewed(canonicalUrl)).toEqual({
                '@type': 'TVSeries',
                name: baseReviewData.headline,
                image: reviewImage
            });
        });

        it('returns null for article section does not have a specific type', () => {
            const canonicalUrl =
                'https://www.lanacion.com.ar/espectaculos/danza/el-duende-de-la-danza-nid301916/';

            expect(getReviewData(canonicalUrl)).toBeNull();
        });

        it('returns null when canonical url is empty', () => {
            expect(getReviewData('')).toBeNull();
        });

        it('returns null when canonical url is invalid', () => {
            expect(getReviewData(null)).toBeNull();
        });
    });
});
