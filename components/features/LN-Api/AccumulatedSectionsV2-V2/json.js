import Consumer from 'fusion:consumer';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
import get from '../../../private/common/utils/get';
import { getNewAcuElements } from '../AccumulatedSectionsV1/helper-api';
import calculatePaginationValue from '../../../../content/sources/utils/pageSource/acumulados/common/calculatePaginationValue';
import acuTransformV2Format from '../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format';


// URL de ejemplo: http://localhost/api/mobile/v2/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/mobile\/v2\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class AccumulatedSectionsMobileV2V2 {
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

        
        this.sectionId=id;

        this.fetch(this.query);

        this.apiData = {
            global: {
                1: IndexAcuV1,
                2: IndexAcuV2
            },
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
                size: size || 30
            };
        }

        if (sectionId.toLowerCase() === '/ultimas-noticias' && sections) {

            const sectionsFormated = JSON.stringify(sections)
                .replace(/,/g, '+OR+')
                .replace('[', '(')
                .replace(']', ')');

            return {
                ...resp,
                sectionsIds: sectionsFormated,
                sourceOrigin: 'composer',
                size: size || 30
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

          

            let newAcuArticlesSourceSection = { ...acuArticlesSourceSection };
            
            newAcuArticlesSourceSection = await getNewAcuElements(
                newAcuArticlesSourceSection,
                acuArticlesSourceSection,
                this.query,
                arcSite
            );



            const indexAcu = this.apiData['global'][
                browser.getApiVersion(requestUri)
            ];

            let title = get(
                this.props.globalContent,
                'acumuladoGeneral.hierarchy_navigation',
                null
            );
            if (title == null) title = name;
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

            const transformedAcu = indexAcu(acuData);

            if (this.query.page * this.query.size - this.query.size > 16) {
                delete transformedAcu[0].banners;
            }

            const paginationValue = calculatePaginationValue(
                transformedAcu[0].acumuladoTotal,
                this.query.size,
                this.query.page
            );
            return acuTransformV2Format(transformedAcu, this.sectionId, paginationValue);

        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}
export default Consumer(AccumulatedSectionsMobileV2V2);
