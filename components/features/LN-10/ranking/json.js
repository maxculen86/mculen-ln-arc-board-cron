import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import { getRankingProps, getSectionParentId } from './common/_helper-WebApi';

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
            layout
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
