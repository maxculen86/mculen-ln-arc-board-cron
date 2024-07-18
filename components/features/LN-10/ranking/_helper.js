import { useContent as getContent } from 'fusion:content';
import get from '../../../private/common/utils/get';
import siteConfig from '../../../../properties/sites/la-nacion-ar';

export const hasArticles = data => !!get(data, 'articles', []).length;

export const getDataContent = (sectionId, sectionParentId, website, layout) => {
    const getRankingData = section =>
        getContent({
            source: 'rankingArticlesSource',
            query: {
                sectionId: section,
                imageConfig: 'boxArticles',
                website,
                layout,
                shouldUseV2:
                    layout === get(siteConfig, 'layoutsName.HomeLN10', '')
            }
        });

    const data = getRankingData(sectionId);

    if (!sectionId || !sectionParentId) {
        return data || {};
    }

    return (hasArticles(data) && data) || getRankingData(sectionParentId);
};
