import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';
import get from '../../../private/common/utils/get';
import { getSectionParentId } from '../../LN-common/ranking/_helper';

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
        const sectionRegex = new RegExp(/\/(.+)/);
        const section = sectionRegex.exec(sectionId)[1];
        this.fetch(section, customFields, 1);

        if (
            !this.state.rankingArticleSource ||
            !this.state.rankingArticleSource.articles ||
            this.state.rankingArticleSource.articles.length === 0
        ) {
            this.fetch(getSectionParentId(section), customFields, 1);
        }

        this.state = { ...this.state };
        this.apiData = {
            global: {
                1: IndexAcuV1,
                2: IndexAcuV2
            },
            mobile: {
                1: IndexAcuV1Mobile
            }
        };
    }

    fetch(section, customFields, index) {
        const size = get(customFields, `size${index}`, 3);

        this.fetchContent({
            rankingArticleSource: {
                source: 'rankingArticlesSource',
                query: {
                    sectionId: section,
                    size,
                    imageConfig: 'boxArticles'
                }
            }
        });
    }

    render() {
        try {
            const { rankingArticleSource, globalContent: configuration } =
                this.state || {};

            const { requestUri } = this.props;

            const indexAcu = this.apiData[browser.getApiType(requestUri)][
                browser.getApiVersion(requestUri)
            ];

            if (
                !rankingArticleSource ||
                !rankingArticleSource.articles ||
                !rankingArticleSource.articles.length === 0
            ) {
                return null;
            }

            const acuData = {
                name: rankingArticleSource.name,
                articles: rankingArticleSource.articles,
                total: rankingArticleSource.articles.length,
                configuration
            };

            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(SectionRanking);
