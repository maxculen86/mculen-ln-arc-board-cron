import Consumer from 'fusion:consumer';
import { SITE_LANACION } from 'fusion:environment';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
import get from '../../../private/common/utils/get';
import { setAuthPromoItem, setAuthCredits, setResizerv2 } from './helper-api';
import nodeFetch from 'node-fetch';
import { getAllImagesAuth } from '../../../../content/sources/utils/signingServiceSource/getImagesAuth';
import { addResizedUrls } from '../../../../components/private/common/utils/image/resizer/addResizerUrls';
import getPresets from '../../../../content/sources/utils/presets';

// URL de ejemplo: http://localhost/api/mobile/v2/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/mobile\/v2\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class AccumulatedSections {
    constructor(props) {
        this.props = props;
        const {
            arcSite,
            globalContent: { _id: id },
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

        this.query = this.getQueryElement(
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
                source: 'lnAcuSource',
                query
            }
        });
    }

    getQueryElement = (
        sectionId,
        size,
        page,
        sections,
        restriction,
        arcSite
    ) => {
        const resp = {
            page,
            imageConfig: 'm',
            api: true,
            'arc-site': arcSite,
            apiTransform: 'transformLnAcuApi'
        };

        if (sectionId.toLowerCase() === '/suscriptores') {
            return {
                ...resp,
                tagId: 'la-nacion-cerca',
                sourceOrigin: 'composer',
                size: this.sizeCf || 30
            };
        }

        if (sectionId.toLowerCase() === '/ultimas-noticias') {
            const sectionsFormated = JSON.stringify(sections)
                .replace(/,/g, '+OR+')
                .replace('[', '(')
                .replace(']', ')');

            return {
                ...resp,
                sectionsIds: sectionsFormated,
                sourceOrigin: 'composer',
                size: this.sizeCf || 30
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

            const newAcuArticlesSourceSection = { ...acuArticlesSourceSection };

            const { presets, presetsDefault } = getPresets(this.query);
            const presetsPromoItems = get(presets, 'promo_items', null);

            newAcuArticlesSourceSection.content_elements = await Promise.all(
                acuArticlesSourceSection.content_elements.map(
                    async (elem, i) => {
                        let isInApertura = false;
                        if (i === 0) {
                            const imageId = get(elem.promo_items.basic, '_id');
                            elem.promo_items.basic.auth = null;
                            isInApertura = true;
                            //elem.promo_items.basic.auth=await getAuthImage({imageId});
                        }
                        if (elem.promo_items) {
                            await setAuthPromoItem(elem.promo_items, arcSite);
                        }
                        if (elem.credits) {
                            await setAuthCredits(elem.credits, arcSite);
                        }
                        return setResizerv2(
                            elem,
                            presets,
                            isInApertura,
                            presetsPromoItems,
                            presetsDefault,
                            arcSite
                        );
                    }
                )
            );

            //return newAcuArticlesSourceSection;
            const indexAcu = this.apiData[browser.getApiType(requestUri)][
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
            return { Success: false, Message: err.message };
        }
    }
}
export default Consumer(AccumulatedSections);
