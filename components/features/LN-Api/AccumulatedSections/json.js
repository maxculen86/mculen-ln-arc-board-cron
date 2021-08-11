import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/accumulated';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
// URL de ejemplo: http://localhost/api/v1/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v1\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class AccumulatedSections {
    constructor(props) {
        this.props = props;
        const {
            globalContent: { _id: id },
            isAdmin,
            customFields: { size: sizeCf, page: pageCf, paramUrlId, sections }
        } = props;
        this.state = {};

        const { size, page } = getSizesFrom(
            isAdmin,
            sizeCf,
            pageCf,
            paramUrlId,
            this.props.requestUri
        );

        const query = this.getQueryElement(id, size, page, sections);

        this.fetch(query);

        this.versions = {
            1: IndexAcuV1,
            2: IndexAcuV2
        };
    }

    fetch(query) {
        this.fetchContent({
            acuArticlesSource: {
                source: 'acuArticlesSource',
                query
            }
        });
    }

    getQueryElement = (sectionId, size, page, sections) => {
        const resp = {
            page,
            imageConfig: 'm'
        };

        if (sectionId.toLowerCase() === '/ultimas-noticias') {
            const sectionsFormated = JSON.stringify(sections)
                .replace(/,/g, '+OR+')
                .replace('[', '(')
                .replace(']', ')');

            return {
                ...resp,
                sectionsIds: sectionsFormated,
                sourceOrigin: 'composer',
                size: null
            };
        }
        return {
            ...resp,
            sectionId,
            size
        };
    };

    render() {
        try {
            const { acuArticlesSource, globalContent: configuration } =
                this.state || {};
            const {
                globalContent: { name },
                requestUri
            } = this.props;
            const indexAcu = this.versions[browser.getApiVersion(requestUri)];
            if (!acuArticlesSource || !acuArticlesSource.content_elements) {
                return null;
            }
            const acuData = {
                tipoAcumulado: 1,
                name,
                articles: acuArticlesSource.content_elements,
                paginator: acuArticlesSource.next,
                total: acuArticlesSource.count,
                configuration
            };
            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}
export default Consumer(AccumulatedSections);
