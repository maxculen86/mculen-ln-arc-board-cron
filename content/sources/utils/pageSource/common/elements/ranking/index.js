import get from '../../../../../../../components/private/common/utils/get';
import {
    getRankingProps,
    RANKING_LAYOUT
} from '../../../../../../../components/features/LN-10/ranking/common/_helper-WebApi';
import siteConfig from '../../../../../../../properties/sites/la-nacion-ar';
import withResizerV2 from '../../../../../../../components/private/common/utils/image/enableResizerV2';
import rankingArticlesSource from '../../../../../rankingArticlesSource';
import configRankingPositionbySection from './config/configRankingPositionbySection';
import { addElementsByKey } from '../../../../../../../components/private/LN/api/global/page/common/utils/addElements';

export const getRankingArticles = async query => {
    return rankingArticlesSource.fetch(query);
};

export const getRankingInfo = async props => {
    const { website, layoutPage: layout, globalContent = {} } = props;
    const featureId = 'rankingHome';
    const { title, sectionId } = getRankingProps(
        layout,
        featureId,
        globalContent
    );

    const query = {
        sectionId,
        imageConfig: 'boxArticles',
        'arc-site': website,
        layout,
        shouldUseV2:
            withResizerV2 &&
            layout === get(siteConfig, 'layoutsName.HomeLN10', '')
    };

    const articles = (await getRankingArticles(query)) || [];

    return {
        title,
        layout: RANKING_LAYOUT,
        articles: (articles && articles.articles) || []
    };
};

export const getRanking = async props => {
    const { elementsPage, ...propsRest } = props;
    try {
        const { title, articles = [], layout } = await getRankingInfo(props);

        // See available types in /private/LN/api/common/home/boxTypes/LN10/index.js
        // In this case the  type is 0 because have this section have articles
        const resp = {
            information: {
                hideCaja: false,
                title,
                layout
            },
            articles
        };

        return resp;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error /pageSource/common/elements/ranking/index.js : ${JSON.stringify(
                propsRest
            )} - errorMsj:${error.message}`
        );
        return null;
    }
};

export const setRankingBySection = async props => {
    const { elementsPage, layoutPage } = props;

    const configRankingBySections = configRankingPositionbySection(layoutPage);
    const ranking = await getRanking(props);

    let elementsPageHome = elementsPage;
    const len = elementsPageHome.length;
    ranking &&
        Array.isArray(ranking.articles) &&
        configRankingBySections &&
        Object.keys(configRankingBySections).some(sectionWeb => {
            const configSectionWeb = configRankingBySections[sectionWeb];
            const configElementToAdd = {
                ...configRankingBySections[sectionWeb],
                ...ranking
            };
            // Goes through sections until confirming that the ranking was positioned
            if (configSectionWeb) {
                elementsPageHome = addElementsByKey(
                    configElementToAdd,
                    sectionWeb,
                    'sectionWeb',
                    elementsPageHome
                );
                if (elementsPageHome.length > len) {
                    return true;
                }
            }
            return false;
        });
    return elementsPageHome;
};

export const setRankingByLayout = {
    'LN10-Home_Main': setRankingBySection
};

export default setRankingByLayout;
