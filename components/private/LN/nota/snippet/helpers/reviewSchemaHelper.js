import {
    isNonEmptyArray,
    isValidString
} from '../../../../common/utils/dataValidation';
import {
    ORGANIZATION_SCHEMA_ID,
    SITE_LANACION_URL
} from './reviewSchemaConstants';

const REVIEW_ITEM_TYPE_RULES = [
    { path: '/espectaculos/cine/', type: 'Movie' },
    { path: '/espectaculos/series-de-tv/', type: 'TVSeries' }
];

const getReviewItemType = canonicalUrl => {
    if (!isValidString(canonicalUrl)) return null;

    return (
        REVIEW_ITEM_TYPE_RULES.find(({ path }) => canonicalUrl.includes(path))
            ?.type || null
    );
};

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
    ratingValue,
    image
}) => {
    const itemType = getReviewItemType(canonicalUrl);
    if (!itemType) return null;

    const imageUrl = isValidString(image) ? image.trim() : '';

    return {
        '@context': 'https://schema.org',
        '@graph': [
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
                    name: headline,
                    ...(imageUrl && { image: imageUrl })
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
