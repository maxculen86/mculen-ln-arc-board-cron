import { useContent } from 'fusion:content';
import get from '../../../private/common/utils/get';

export const hasArticles = data => !!get(data, 'articles', []).length;

export const useRankingArticles = (
    sectionId,
    website,
    layout,
    fromSection,
    source
) => {
    const data = useContent({
        source,
        query: {
            sectionId,
            api: fromSection === 'ctrMobile',
            imageConfig: fromSection === 'ctrMobile' ? 'ctr' : 'boxArticles',
            website,
            layout,
            section: fromSection
        }
    });

    return hasArticles(data) ? data : {};
};
