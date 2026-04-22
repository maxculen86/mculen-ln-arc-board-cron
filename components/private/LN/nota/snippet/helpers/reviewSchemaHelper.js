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
    { path: '/espectaculos/musica/', type: 'MusicEvent' },
    { path: '/espectaculos/series-de-tv/', type: 'TVSeries' },
    { path: '/espectaculos/teatro/', type: 'TheaterEvent' }
];

const DEFAULT_REVIEW_ITEM_TYPE = 'CreativeWork';

const getReviewItemType = canonicalUrl => {
    if (!isValidString(canonicalUrl)) return DEFAULT_REVIEW_ITEM_TYPE;

    return (
        REVIEW_ITEM_TYPE_RULES.find(({ path }) => canonicalUrl.includes(path))
            ?.type || DEFAULT_REVIEW_ITEM_TYPE
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
    ratingValue
}) => {
    const itemType = getReviewItemType(canonicalUrl);

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
