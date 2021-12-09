import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
import get from 'lodash.get';
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

        const restriction = get(
            this.props.globalContent,
            'acumuladoGeneral.mostrar_en_acu_apps',
            'true'
        );

        const query = this.getQueryElement(
            id,
            size,
            page,
            sections,
            restriction
        );

        this.fetch(query);

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

    fetch(query) {
        this.fetchContent({
            acuArticlesSource: {
                source: 'acuArticlesSource',
                query
            }
        });
    }

    getQueryElement = (sectionId, size, page, sections, restriction) => {
        const resp = {
            page,
            imageConfig: 'm',
            api: true
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

        let excludeSourceOrigin = '';
        if (restriction && restriction === 'false')
            excludeSourceOrigin = 'ArcImporter-LnData';

        return {
            ...resp,
            sectionId,
            size,
            excludeSourceOrigin
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
            const indexAcu = this.apiData[browser.getApiType(requestUri)][
                browser.getApiVersion(requestUri)
            ];
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
