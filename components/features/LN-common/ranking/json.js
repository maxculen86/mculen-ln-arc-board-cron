import Consumer from 'fusion:consumer';
import { getRankingProps } from './_helper';

class RankingFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const {
                outputType,
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
                isHome,
                notesQuantity,
                classCondition,
                rankingLayout
            } = getRankingProps(layout, featureId, globalContent);
            const resp = {
                information: {
                    hideCaja: false,
                    imageConfig: 'boxArticles',
                    sectionId,
                    notesQuantity,
                    ...this.props.customFields
                },
                articles: [{ alto: 9999 }]
            };

            return resp;
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

RankingFeature.label = 'LN-Common-Ranking';

export default Consumer(RankingFeature);
