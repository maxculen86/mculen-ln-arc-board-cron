import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
import get from '../../../private/common/utils/get';
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

        this.isAPI = query.api || false;
    }

    fetch(query) {
        this.fetchContent({
            acuArticlesSourceSection: {
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
            const { acuArticlesSourceSection, globalContent: configuration } =
                this.state || {};
            const {
                globalContent: { name },
                requestUri
            } = this.props;
            const indexAcu = this.apiData[browser.getApiType(requestUri)][
                browser.getApiVersion(requestUri)
            ];

            if (
                !acuArticlesSourceSection ||
                !acuArticlesSourceSection.content_elements
            ) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Empty content result. Global content info: ${JSON.stringify(
                        this.props.globalContent
                    )}`
                );
                return null;
            }

            // TODO comentado hasta validar de donde viene el error - BACKEND card 89766
            // if (
            //     (!acuArticlesSource || !acuArticlesSource.content_elements) &&
            //     this.isAPI
            // ) {
            //     // eslint-disable-next-line no-console
            //     console.warn(
            //         `Empty content result. Global content info: ${JSON.stringify(
            //             this.props.globalContent
            //         )}`
            //     );

            //     throw new Error(
            //         'Data query response cannot be null or undefined'
            //     );
            // }
            let title = get(
                this.props.globalContent,
                'acumuladoGeneral.hierarchy_navigation',
                null
            );
            if (title == null) title = name;
            const acuData = {
                tipoAcumulado: 1,
                name: title,
                articles: acuArticlesSourceSection.content_elements,
                paginator: acuArticlesSourceSection.next,
                total: acuArticlesSourceSection.count,
                configuration
            };
            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}
export default Consumer(AccumulatedSections);
