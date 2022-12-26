import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import { getRankingProps } from './_helper';

class RankingFeature {
    constructor(props) {
        this.props = props;
        const {
            website,
            arcSite,
            layout,
            globalContent = {},
            id: featureId
        } = this.props;

        const {
            title,
            sectionName,
            sectionId,
            notesQuantity
        } = getRankingProps(layout, featureId, globalContent);

        this.title = title ?? sectionName;

        const query = {
            sectionId,
            size: notesQuantity,
            imageConfig: 'boxArticles',
            'arc-site': website ?? arcSite
        };
        this.fetch(query);
    }

    fetch(query) {
        this.fetchContent({
            rankingApi: {
                source: 'rankingArticlesSource',
                query
            }
        });
    }

    render() {
        try {
            const { rankingApi } = this.state || {};
            const resp = {
                information: {
                    hideCaja: false,
                    title: this.title
                },
                articles: get(rankingApi, 'articles', []) || []
            };

            return resp;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

RankingFeature.label = 'LN-Common-Ranking';

export default Consumer(RankingFeature);
