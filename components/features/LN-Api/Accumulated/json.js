import Consumer from 'fusion:consumer';
import calculatePaginationValue from '../../../../content/sources/utils/pageSource/acumulados/common/calculatePaginationValue';
import acuTransformV2Format from '../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format';
import { enumTypeError } from '../../../private/LN/api/common/enums/enumTypeError';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import browser from '../../../private/common/utils/browser';
import get from '../../../private/common/utils/get';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
import { getNewAcuElements } from '../AccumulatedSectionsV1/helper-api';

const DEFAULT_SIZE = 30;
const SECTION_ULTIMAS_NOTICIAS = '/ultimas-noticias';
const SECTION_SUSCRIPTORES = '/suscriptores';
const API = {
    mobile: {
        1: IndexAcuV1Mobile,
        2: IndexAcuV1Mobile
    },
    global: {
        1: IndexAcuV1,
        2: IndexAcuV2
    }
};
const getQueryElement = (
    sectionId,
    size,
    page,
    sections,
    restriction,
    arcSite,
    distributorId
) => {
    const normalizedSectionId = sectionId?.toLowerCase();
    const baseResponse = {
        page,
        imageConfig: 'm',
        api: true,
        'arc-site': arcSite,
        apiTransform: 'transformLnAcuApi',
        size: size || DEFAULT_SIZE
    };

    const excludeSourceOrigin =
        restriction === 'false' ? 'ArcImporter-LnData' : '';

    if (normalizedSectionId === SECTION_SUSCRIPTORES) {
        return {
            ...baseResponse,
            tagId: 'la-nacion-cerca',
            sourceOrigin: 'composer'
        };
    }

    if (normalizedSectionId === SECTION_ULTIMAS_NOTICIAS && sections) {
        const sectionsFormatted = `("${sections.join('"+OR+"')}")`;
        return {
            ...baseResponse,
            sectionsIds: sectionsFormatted,
            sourceOrigin: 'composer'
        };
    }

    if (distributorId) {
        return {
            ...baseResponse,
            excludeSourceOrigin,
            distributorId
        };
    }

    return {
        ...baseResponse,
        sectionId,
        excludeSourceOrigin
    };
};

// URL de ejemplo: http://localhost/api/mobile/v2/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/mobile\/v2\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class Accumulated {
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
                sections,
                sectionId: featureSectionId = null
            }
        } = props;

        this.state = {};
        this.sizeCf = sizeCf;

        const id = get(globalContent, '_id', null);
        const distributorId = get(globalContent, 'distributorId', null);
        const distributorSlug = get(globalContent, 'slug', null);
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

        this.query = getQueryElement(
            featureSectionId || id,
            size,
            page,
            sections,
            restriction,
            arcSite,
            distributorId
        );

        this.sectionId = distributorId
            ? distributorSlug
            : featureSectionId || id;

        this.fetchContent({
            acuArticlesSourceSection: {
                source: 'apiLnAcuSource',
                query: this.query
            }
        });

        if (featureSectionId) {
            const queryParams = {
                id: featureSectionId,
                website: arcSite,
                api: 'true'
            };
            this.fetchContent({
                sectionSource: {
                    source: 'sectionSource',
                    query: queryParams
                }
            });
        }
    }

    async render() {
        try {
            const {
                acuArticlesSourceSection,
                globalContent: configuration,
                sectionSource
            } = this.state || {};

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

            let title = get(
                sectionSource || this.props.globalContent,
                'acumuladoGeneral.hierarchy_navigation',
                null
            );

            if (title == null) title = sectionSource?.name || name;

            const acuData = {
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

            const indexAcu =
                API[browser.getApiType(requestUri)][
                    browser.getApiVersion(requestUri)
                ];
            const transformedAcu = indexAcu(acuData);

            if (this.query.page * this.query.size - this.query.size > 16) {
                delete transformedAcu[0].banners;
            }

            const paginationValue = calculatePaginationValue(
                transformedAcu[0].acumuladoTotal,
                this.query.size,
                this.query.page
            );

            return acuTransformV2Format(
                transformedAcu,
                this.sectionId,
                paginationValue
            );
        } catch (err) {
            console.error(
                JSON.stringify({
                    customType: enumTypeError.featureError,
                    log_details: {
                        error: JSON.stringify(err || {}),
                        message: err.message,
                        query: this.query
                    },
                    name: 'BackendLnError'
                })
            );
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Accumulated);
