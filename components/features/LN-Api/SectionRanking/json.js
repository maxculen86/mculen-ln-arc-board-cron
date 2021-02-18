import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';
import filter from '../../../../content/filters/LN/nota/articleRanking';
import { isMigratedCategory } from '../../../private/common/utils/migratedCategoriesHelper';
import get from '../../../private/common/utils/get';

// URL de ejemplo: http://localhost/api/v1/notas/ranking/bySection/recetas/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v1\/notas\/ranking\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class SectionRanking {
    constructor(props) {
        this.props = props;

        const {
            globalContent: { _id: sectionId },
            customFields
        } = props;

        const categoryMigrated = isMigratedCategory(sectionId, true);
        if (categoryMigrated) {
            this.state = {};
            this.fetch(sectionId, customFields, 1);

            if (
                !this.state.rankingArticleSource ||
                this.state.rankingArticleSource.content_elements.length === 0
            ) {
                this.fetch(sectionId, customFields, 2);
            }
        }

        this.state = { ...this.state, categoryMigrated };

        this.versions = {
            1: IndexAcuV1
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
        const {
            rankingArticleSource,
            categoryMigrated,
            globalContent: configuration
        } = this.state || {};

        const {
            globalContent: { name },
            requestUri
        } = this.props;

        const indexAcu = this.versions[browser.getApiVersion(requestUri)];

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

        const acuData = {
            name,
            articles: rankingArticleSource.content_elements,
            total: rankingArticleSource.content_elements.length,
            configuration
        };

        return indexAcu(acuData);
    }
}

export default Consumer(SectionRanking);
