import get from '../../../private/common/utils/get';
import { getMediaData } from '../../../private/LN/common/utils/mediaHelper';
import getMediaFigCaption from './getMediaFigCaption';
import formatAuthorList from './formatAuthorList';

const CONFIG = {
    ANALYSIS_TAG_SLUG: 'analisis-tid63578',
    EDITORIALS_SECTION_ID: '/editoriales'
};

const resolveOpinionVariant = ({ primarySectionId, tags }) => {
    if (primarySectionId === CONFIG.EDITORIALS_SECTION_ID) {
        return 'EDITORIALS';
    }

    if (tags.some(({ slug }) => slug === CONFIG.ANALYSIS_TAG_SLUG)) {
        return 'ANALYSIS';
    }

    return 'OPINION';
};

const OPINION_VARIANT_CONFIG = {
    EDITORIALS: {
        label: 'EDITORIALES',
        showAuthors: false
    },
    ANALYSIS: {
        label: 'ANÁLISIS',
        showAuthors: true
    },
    OPINION: {
        label: 'OPINIÓN',
        showAuthors: false
    }
};

export const buildOpinionData = globalContent => {
    const authors = get(globalContent, 'credits.by', []);
    const promoItems = get(globalContent, 'promo_items', {});
    const mediaData = getMediaData(promoItems);
    const { text: caption, attribution } = getMediaFigCaption(mediaData);
    const tags = get(globalContent, 'taxonomy.tags', []);
    const primarySectionId = get(
        globalContent,
        'taxonomy.primary_section._id',
        ''
    );

    const variant = resolveOpinionVariant({
        primarySectionId,
        tags
    });

    return {
        authorsConcat: formatAuthorList(authors),
        media: {
            mediaData,
            caption,
            attribution
        },
        headline: get(globalContent, 'headlines.basic', ''),
        subheadline: get(globalContent, 'subheadlines.basic', ''),
        ...OPINION_VARIANT_CONFIG[variant]
    };
};
