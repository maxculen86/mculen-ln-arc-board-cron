import {
    isNonEmptyArray,
    isValidString
} from '../../../../common/utils/dataValidation';
import {
    ORGANIZATION_SCHEMA_ID,
    REVIEW_LOGO_URL,
    SITE_LANACION_URL
} from './reviewSchemaConstants';

const isMovieReview = canonicalUrl =>
    isValidString(canonicalUrl) && canonicalUrl.includes('/espectaculos/cine/');

export const getReviewAuthor = ({
    authors,
    hasAuthors = isNonEmptyArray(authors)
}) =>
    hasAuthors
        ? authors[0]
        : {
              '@type': 'Organization',
              name: 'LA NACION',
              url: SITE_LANACION_URL
          };

export const getReviewSchemaData = ({
    canonicalUrl,
    reviewUrl,
    headline,
    author,
    datePublished,
    ratingValue
}) => {
    const itemType = isMovieReview(canonicalUrl) ? 'Movie' : 'Thing';

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'NewsMediaOrganization',
                '@id': ORGANIZATION_SCHEMA_ID,
                name: 'LA NACION',
                url: SITE_LANACION_URL,
                logo: {
                    '@type': 'ImageObject',
                    url: REVIEW_LOGO_URL
                }
            },
            {
                '@type': 'Review',
                '@id': `${reviewUrl}#review`,
                url: reviewUrl,
                headline,
                publisher: { '@id': ORGANIZATION_SCHEMA_ID },
                author,
                datePublished,
                itemReviewed: {
                    '@type': itemType,
                    name: headline
                },
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: `${ratingValue}`,
                    bestRating: '5',
                    worstRating: '0.5'
                }
            }
        ]
    };
};
