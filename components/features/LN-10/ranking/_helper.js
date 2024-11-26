import { useContent as getContent } from 'fusion:content';
import get from '../../../private/common/utils/get';

export const hasArticles = data => !!get(data, 'articles', []).length;

export const getDataContent = (
    sectionId,
    sectionParentId,
    website,
    layout,
    fromSection
) => {
    const getRankingData = section =>
        getContent({
            source: 'rankingArticlesSource',
            query: {
                sectionId: section,
                imageConfig:
                    fromSection === 'ctrMobile' ? 'ctr' : 'boxArticles',
                website,
                layout,
                section: fromSection
            }
        });

    const data = getRankingData(sectionId);

    if (!sectionId || !sectionParentId) {
        return data || {};
    }

    return (hasArticles(data) && data) || getRankingData(sectionParentId);
};
