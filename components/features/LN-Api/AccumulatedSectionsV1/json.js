import Consumer from 'fusion:consumer';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
import get from '../../../private/common/utils/get';
import { getNewAcuElements } from './helper-api';
import { BackendLnError } from '../../../private/LN/api/common/models/backendLnError';
import { enumTypeError } from '../../../private/LN/api/common/enums/enumTypeError';

// URL de ejemplo: http://localhost/api/mobile/v1/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/mobile\/v1\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class AccumulatedSectionsMobileV1 {
    constructor(props) {
        this.props = props;
        const {
            arcSite,
            globalContent,
            isAdmin,
            customFields: {
                size: sizeCf = 30,
                page: pageCf = 1,
                paramUrlId = 'params',
                sections
            }
        } = props;

        this.state = {};
        this.sizeCf = sizeCf;

        const id = get(globalContent, '_id', null);
        if (!id) {
            console.warn(
                new BackendLnError(
                    `AccumulatedSectionsV1 - msj: No existe Id de Seccion - GlobalContent: ${JSON.stringify(globalContent || {})}`,
                    enumTypeError.featureError
                )
            );
        }
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

        const getQueryElement = (
            sectionIdP,
            sizeP,
            pageP,
            sectionsP,
            restrictionP,
            arcSiteP
        ) => {
            const resp = {
                page: pageP,
                imageConfig: 'm',
                api: true,
                'arc-site': arcSiteP,
                apiTransform: 'transformLnAcuApi'
            };

            if (sectionIdP.toLowerCase() === '/suscriptores') {
                return {
                    ...resp,
                    tagId: 'la-nacion-cerca',
                    sourceOrigin: 'composer',
                    size: sizeP || 30
                };
            }

            if (sectionIdP.toLowerCase() === '/ultimas-noticias' && sectionsP) {
                const sectionsFormated = JSON.stringify(sectionsP)
                    .replace(/,/g, '+OR+')
                    .replace('[', '(')
                    .replace(']', ')');

                return {
                    ...resp,
                    sectionsIds: sectionsFormated,
                    sourceOrigin: 'composer',
                    size: sizeP || 30
                };
            }

            let excludeSourceOrigin = '';
            if (restrictionP && restrictionP === 'false')
                excludeSourceOrigin = 'ArcImporter-LnData';

            return {
                ...resp,
                sectionId: sectionIdP,
                size: sizeP,
                excludeSourceOrigin
            };
        };

        this.query = getQueryElement(
            id,
            size,
            page,
            sections,
            restriction,
            arcSite
        );

        this.fetch(this.query);

        this.apiData = {
            mobile: {
                1: IndexAcuV1Mobile,
                2: IndexAcuV1Mobile
            }
        };

        this.isAPI = this.query.api || false;
    }

    fetch(query) {
        this.fetchContent({
            acuArticlesSourceSection: {
                source: 'apiLnAcuSource',
                query
            }
        });
    }

    async render() {
        try {
            const { acuArticlesSourceSection, globalContent: configuration } =
                this.state || {};
            const {
                arcSite,
                globalContent: { name },
                requestUri
            } = this.props;

            if (
                !acuArticlesSourceSection ||
                !acuArticlesSourceSection.content_elements
            ) {
                return null;
            }

            let newAcuArticlesSourceSection = { ...acuArticlesSourceSection };

            newAcuArticlesSourceSection = await getNewAcuElements(
                newAcuArticlesSourceSection,
                acuArticlesSourceSection,
                this.query,
                arcSite
            );

            const indexAcu =
                this.apiData[browser.getApiType(requestUri)][
                    browser.getApiVersion(requestUri)
                ];

            let title = get(
                this.props.globalContent,
                'acumuladoGeneral.hierarchy_navigation',
                null
            );
            if (title == null) title = name;
            const acuData = {
                slug: get(this.props.globalContent, '_id'),
                tipoAcumulado: 1,
                name: title,
                articles: newAcuArticlesSourceSection.content_elements,
                paginator: newAcuArticlesSourceSection.next,
                total: newAcuArticlesSourceSection.count,
                configuration
            };
            if (acuData.slug === '/suscriptores') {
                acuData.name = 'Suscriptores';
            }

            return indexAcu(acuData);
        } catch (err) {
            console.error(
                new BackendLnError(
                    `AccumulatedSectionsV1 - msj: ${
                        err.message
                    } - Error: ${JSON.stringify(err || {})}`,
                    enumTypeError.featureError
                )
            );
            return { Success: false, Message: err.message };
        }
    }
}
export default Consumer(AccumulatedSectionsMobileV1);
