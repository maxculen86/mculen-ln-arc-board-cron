import Consumer from 'fusion:consumer';
import IndexRankingV1 from '../../../private/LN/api/v1/ranking';
import browser from '../../../private/common/utils/browser';
import filter from '../../../../content/filters/LN/nota/articleRanking';
import { isMigratedCategory } from '../../../private/common/utils/migratedCategoriesHelper';
import get from '../../../private/common/utils/get';

// URL de ejemplo: http://localhost/api/v1/notas/ranking/bySection/recetas/params=size:1;weeks:1;days:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v1\/notas\/ranking\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class SectionRanking {
    constructor(props) {
        this.props = props;

        const {
            globalContent,
            globalContent: { _id: sectionId },
            customFields
        } = props;

        const categoryMigrated = isMigratedCategory(
            sectionId,
            get(globalContent, 'migration', null)
        );

        if (!categoryMigrated) {
            throw new Error(
                `La categoria '${sectionId}' no posee la propiedad migration`
            );
        }

        this.state = {};
        this.fetch(sectionId, customFields, 1);

        if (
            !this.state.rankingArticleSource ||
            this.state.rankingArticleSource.content_elements.length === 0
        ) {
            this.fetch(sectionId, customFields, 2);
        }

        this.versions = {
            1: IndexRankingV1
        };
    }

    fetch(sectionId, customFields, index) {
        const weeksAgo = get(customFields, `weeksAgo${index}`, 1);
        const daysAgo = get(customFields, `daysAgo${index}`, 1);
        const size = get(customFields, `size${index}`, 3);

        this.fetchContent({
            rankingArticleSource: {
                source: 'rankingArticlesSource',
                query: {
                    sectionId,
                    weeksAgo,
                    daysAgo,
                    size,
                    imageConfig: 'm'
                },
                filter
            }
        });
    }

    render() {
        try {
            const { rankingArticleSource } = this.state || {};

            const {
                globalContent: { name }
            } = this.props;

            const indexRanking = this.versions[
                browser.getApiVersion(this.props.requestUri)
            ];

            if (
                !rankingArticleSource ||
                !rankingArticleSource.content_elements
            ) {
                return null;
            }

            return indexRanking(name, rankingArticleSource.content_elements);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(SectionRanking);
