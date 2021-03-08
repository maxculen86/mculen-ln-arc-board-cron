import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';
import filter from '../../../../content/filters/LN/nota/articleRanking';
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

        this.state = {};
        this.fetch(sectionId, customFields, 1);

        if (
            !this.state.rankingArticleSource ||
            this.state.rankingArticleSource.content_elements.length === 0
        ) {
            this.fetch(sectionId, customFields, 2);
        }

        this.state = { ...this.state };

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
        const { rankingArticleSource, globalContent: configuration } =
            this.state || {};

        const {
            globalContent: { name },
            requestUri
        } = this.props;

        const indexAcu = this.versions[browser.getApiVersion(requestUri)];

        if (!rankingArticleSource || !rankingArticleSource.content_elements) {
            return null;
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
