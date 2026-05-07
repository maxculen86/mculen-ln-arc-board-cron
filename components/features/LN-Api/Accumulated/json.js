import Consumer from 'fusion:consumer';
import transformLnAcuApi from '../../../../content/sources/utils/lnAcuSources/api/helper';
import calculatePaginationValue from '../../../../content/sources/utils/pageSource/acumulados/common/calculatePaginationValue';
import acuTransformV2Format from '../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format';
import { enumTypeError } from '../../../private/LN/api/common/enums/enumTypeError';
import { BackendLnError } from '../../../private/LN/api/common/models/backendLnError';
import get from '../../../private/common/utils/get';
import { getNewAcuElements } from '../AccumulatedSectionsV1/helper-api';
import {
    DEFAULT_PAGE,
    DEFAULT_SIZE,
    SECTION_SUSCRIPTORES,
    buildAcuData,
    buildLnAcuBySectionQuery,
    isDeepPagination,
    isDistributorSource,
    resolveIndexTransform,
    resolveTitle,
    warnIfMissingSectionData
} from './helper';

// URL de ejemplo: http://localhost/api/mobile/v2/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/mobile\/v2\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependerá del customField "paramUrlId" configurado
class Accumulated {
    constructor(props) {
        this.props = props;
        const {
            arcSite,
            globalContent,
            globalContentConfig = {},
            isAdmin,
            requestUri,
            customFields: {
                size: sizeCf = DEFAULT_SIZE,
                page: pageCf = DEFAULT_PAGE,
                paramUrlId = 'params',
                sections = [],
                sectionId: featureSectionId = null
            }
        } = props;

        this.state = {};
        warnIfMissingSectionData(globalContent);

        const id = get(globalContent, '_id', null);
        const distributorId = get(globalContent, 'distributorId', null);
        const distributorSlug = get(globalContent, 'slug', null);
        const source = get(globalContentConfig, 'source', null);
        this.query = buildLnAcuBySectionQuery({
            arcSite,
            globalContent,
            isAdmin,
            sizeCf,
            pageCf,
            paramUrlId,
            sections,
            requestUri,
            featureSectionId,
            distributorId,
            source
        });

        this.sectionId = isDistributorSource(source, distributorId)
            ? distributorSlug
            : featureSectionId || id;

        this.fetch(this.query, { featureSectionId, arcSite });
    }

    fetch(query, { featureSectionId, arcSite } = {}) {
        this.fetchContent({
            acuArticlesSourceSection: {
                source: 'acuArticlesSourceV2',
                query
            }
        });

        if (featureSectionId) {
            this.fetchContent({
                sectionSource: {
                    source: 'sectionSource',
                    query: {
                        id: featureSectionId,
                        website: arcSite,
                        api: 'true'
                    }
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

            if (
                !acuArticlesSourceSection ||
                !acuArticlesSourceSection.content_elements
            ) {
                return null;
            }

            const {
                arcSite,
                globalContent,
                globalContentConfig = {},
                requestUri
            } = this.props;
            const { name } = globalContent || {};
            const routeParams = get(globalContent, 'query', {}) || {};

            const transformed = await transformLnAcuApi(
                acuArticlesSourceSection,
                this.query
            );

            const newAcuArticlesSourceSection = await getNewAcuElements(
                { ...transformed },
                acuArticlesSourceSection,
                this.query,
                arcSite
            );

            const indexAcu = resolveIndexTransform(routeParams, requestUri);
            if (typeof indexAcu !== 'function') {
                throw new Error('Accumulated: index transformer missing');
            }

            const acuData = buildAcuData({
                title: resolveTitle(
                    routeParams,
                    globalContent,
                    name,
                    sectionSource
                ),
                configuration,
                routeParams,
                elements: newAcuArticlesSourceSection
            });
            if (this.sectionId === SECTION_SUSCRIPTORES) {
                acuData.name = 'Suscriptores';
            }

            const transformedAcu = indexAcu(acuData);

            const page = Number(this.query.page);
            const size = Number(this.query.size);

            if (isDeepPagination(page, size)) {
                delete transformedAcu[0].banners;
            }

            const paginationValue = calculatePaginationValue(
                transformedAcu[0].acumuladoTotal,
                Number.isNaN(size) ? DEFAULT_SIZE : size,
                Number.isNaN(page) ? DEFAULT_PAGE : page
            );

            const slugForPayload =
                get(globalContentConfig, 'query.sectionId', '') ||
                this.sectionId;

            return acuTransformV2Format(
                transformedAcu,
                slugForPayload,
                paginationValue
            );
        } catch (err) {
            console.error(
                new BackendLnError(
                    `Accumulated - msj: ${err.message} - Error: ${JSON.stringify(err || {})}`,
                    enumTypeError.featureError
                )
            );
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Accumulated);
