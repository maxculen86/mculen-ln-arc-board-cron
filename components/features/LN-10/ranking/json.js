import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import {
    getRankingProps,
    getSectionParentId,
    RANKING_LAYOUT
} from './common/_helper-WebApi';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import withResizerV2 from '../../../private/common/utils/image/enableResizerV2';

class RankingFeature {
    constructor(props) {
        this.props = props;
        const { website, arcSite, layout, globalContent = {} } = this.props;
        const featureId = 'rankingHome';
        const { title, sectionId } = getRankingProps(
            layout,
            featureId,
            globalContent
        );

        const sectionParentId = getSectionParentId(sectionId);

        this.state = {};
        this.title = title;

        const query = {
            sectionId,
            imageConfig: 'boxArticles',
            website: website || arcSite,
            layout,
            shouldUseV2:
                withResizerV2 &&
                layout === get(siteConfig, 'layoutsName.HomeLN10', '')
        };
        this.fetch(query);
        query.sectionId = sectionParentId;
        this.fetchParent(query);
    }

    fetch(query) {
        this.fetchContent({
            rankingSectionApi: {
                source: 'rankingArticlesSource',
                query,
                staticMode: true
            }
        });
    }

    fetchParent(query) {
        this.fetchContent({
            rankingSectionParentApi: {
                source: 'rankingArticlesSource',
                query,
                staticMode: true
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
            return {
                information: {
                    hideCaja: false,
                    title: this.title
                },
                articles:
                    get(rankingSectionApi, 'articles', []) ||
                    get(rankingSectionParentApi, 'articles', []) ||
                    []
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

RankingFeature.label = 'LN10 Ranking';

export default Consumer(RankingFeature);
