import Consumer from 'fusion:consumer';
import IndexRankingV1 from '../../../private/LN/api/v1/ranking';
import browser from '../../../private/common/utils/browser';
import filter from '../../../../content/filters/LN/nota/articleRanking';
import { isMigratedCategory } from '../../../private/common/utils/migratedCategoriesHelper';

// URL de ejemplo: http://localhost/api/v1/notas/ranking/bySection/recetas/params=size:1;weeks:1;days:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v1\/notas\/ranking\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class SectionRanking {
    constructor(props) {
        this.props = props;

        const {
            globalContent: { _id: id },
            isAdmin,
            customFields: {
                size: sizeCf,
                weeks: weeksCf,
                days: daysCf,
                paramUrlId
            },
            outputType
        } = props;

        console.log(outputType);

        this.state = {};

        const categoryMigrated = isMigratedCategory(id, true);
        if (categoryMigrated) {
            const days = browser.getSizesFrom(
                isAdmin,
                daysCf,
                paramUrlId,
                'days',
                this.props.requestUri
            );

            const weeks = browser.getSizesFrom(
                isAdmin,
                weeksCf,
                paramUrlId,
                'weeks',
                this.props.requestUri
            );

            let size = browser.getSizesFrom(
                isAdmin,
                sizeCf,
                paramUrlId,
                'size',
                this.props.requestUri
            );

            if (size > 100) size = 100;

            this.fetchContent({
                rankingArticleSource: {
                    source: 'rankingArticlesSource',
                    query: {
                        sectionId: id,
                        weeksAgo: weeks,
                        daysAgo: days,
                        size,
                        imageConfig: 'm'
                    },
                    filter
                }
            });
        }

        this.state = { ...this.state, categoryMigrated };

        this.versions = {
            1: IndexRankingV1
        };
    }

    render() {
        const { rankingArticleSource, categoryMigrated } = this.state || {};

        const {
            globalContent: { name }
        } = this.props;

        const indexRanking = this.versions[
            browser.getApiVersion(this.props.requestUri)
        ];

        if (!rankingArticleSource || !rankingArticleSource.content_elements) {
            return null;
        }

        if (!categoryMigrated) {
            return {
                success: false,
                message:
                    'Esta categoria aún no ha sido migrada, debe de consultar en Api Contenidos',
                code: 202
            };
        }

        return indexRanking(name, rankingArticleSource.content_elements);
    }
}

export default Consumer(SectionRanking);
