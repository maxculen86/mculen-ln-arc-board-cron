import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import {
    getRankingProps,
    getSectionParentId,
    RANKING_LAYOUT
} from './common/_helper-WebApi';
import checkHydrateOnly from '../../../private/LN/common/utils/checkHydrateOnly';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import withResizerV2 from '../../../private/common/utils/image/enableResizerV2';

class RankingFeature {
    constructor(props) {
        this.props = props;
        const { website, arcSite, layout, globalContent = {} } = this.props;
        const featureId = 'rankingHome';
        const { node_type: nodeType } = globalContent;
        const { title, sectionId } = getRankingProps(
            layout,
            featureId,
            globalContent
        );

        const sectionParentId = getSectionParentId(sectionId);
        const hasHydrateOnly = checkHydrateOnly({ layout, nodeType });

        this.state = {};
        this.title = title;

        const rules = diagramationRules(RANKING_LAYOUT) || [];

        const query = {
            sectionId,
            imageConfig: 'boxArticles',
            website: website || arcSite,
            layout,
            shouldUseV2:
                withResizerV2 &&
                layout === get(siteConfig, 'layoutsName.HomeLN10', '')
        };
        this.fetch(query, hasHydrateOnly);
        query.sectionId = sectionParentId;
        this.fetchParent(query, hasHydrateOnly);
    }

    fetch(query, hasHydrateOnly) {
        this.fetchContent({
            rankingSectionApi: {
                source: 'rankingArticlesSource',
                query,
                staticMode: hasHydrateOnly
            }
        });
    }

    fetchParent(query, hasHydrateOnly) {
        this.fetchContent({
            rankingSectionParentApi: {
                source: 'rankingArticlesSource',
                query,
                staticMode: hasHydrateOnly
            }
        });
    }

    render() {
        try {
            const { rankingSectionApi, rankingSectionParentApi } =
                this.state || {};

            if (!rankingSectionApi && !rankingSectionParentApi) {
                return null;
            }
            const resp = {
                information: {
                    hideCaja: false,
                    title: this.title
                },
                articles:
                    get(rankingSectionApi, 'articles', []) ||
                    get(rankingSectionParentApi, 'articles', []) ||
                    []
            };

            return resp;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

RankingFeature.label = 'LN10 Ranking';

export default Consumer(RankingFeature);
