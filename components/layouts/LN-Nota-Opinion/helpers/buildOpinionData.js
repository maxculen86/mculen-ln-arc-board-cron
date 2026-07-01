import formatAuthorsAsString from '../../../private/common/utils/formatAuthorsAsString';
import get from '../../../private/common/utils/get';
import { getMediaData } from '../../../private/LN/common/utils/mediaHelper';
import getMediaFigCaption from './getMediaFigCaption';

const CONFIG = {
    ANALYSIS_TAG_SLUG: 'analisis-tid63578',
    EDITORIALS_SECTION_ID: '/editoriales'
};

const resolveOpinionLabelType = ({ primarySectionId, tags }) => {
    if (primarySectionId === CONFIG.EDITORIALS_SECTION_ID) {
        return 'EDITORIALS';
    }

    if (tags.some(({ slug }) => slug === CONFIG.ANALYSIS_TAG_SLUG)) {
        return 'ANALYSIS';
    }

    return 'OPINION';
};

const OPINION_LABEL_CONFIG = {
    EDITORIALS: {
        label: 'EDITORIALES',
        showAuthorsInOpening: () => false
    },
    ANALYSIS: {
        label: 'ANÁLISIS',
        showAuthorsInOpening: authors => authors.length === 1
    },
    OPINION: {
        label: 'OPINIÓN',
        showAuthorsInOpening: () => false
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

    const labelType = resolveOpinionLabelType({
        primarySectionId,
        tags
    });

    const opinionConfig = OPINION_LABEL_CONFIG[labelType];

    return {
        authorsConcat: formatAuthorsAsString(authors),
        media: {
            mediaData,
            caption,
            attribution
        },
        headline: get(globalContent, 'headlines.basic', ''),
        subheadline: get(globalContent, 'subheadlines.basic', ''),
        label: opinionConfig.label,
        showAuthorsInOpening: opinionConfig.showAuthorsInOpening(authors)
    };
};
