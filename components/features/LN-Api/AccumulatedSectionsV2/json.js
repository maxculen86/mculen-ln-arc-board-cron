import Consumer from 'fusion:consumer';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import get from '../../../private/common/utils/get';
import calculatePaginationValue from '../../../../content/sources/utils/pageSource/acumulados/common/calculatePaginationValue';
import acuTransformV2Format from '../../../../content/sources/utils/pageSource/acumulados/v2/mobile/bySection/acuTransformV2Format';
import { getNewAcuElements } from '../AccumulatedSectionsV1/helper-api';

// URL de ejemplo: http://localhost/api/mobile/v2/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/mobile\/v2\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class AccumulatedSectionsMobileV2 {
    constructor(props) {
        this.props = props;

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

        this.state = {};
    }

    async render() {
        try {
            const {
                arcSite,
                globalContent,
                globalContentConfig = {}
            } = this.props || {};

            const slug = get(globalContentConfig, 'query.sectionId', '');
            const params = get(globalContent, 'query', {});
            const queryPresets = {
                'arc-site': arcSite,
                imageConfig: 'm',
                shouldUseV2: true
            };

            let newAcuArticlesSourceSection = { ...globalContent };

            newAcuArticlesSourceSection = await getNewAcuElements(
                newAcuArticlesSourceSection,
                globalContent,
                queryPresets,
                arcSite
            );

            const {
                title,
                configuration,
                categoryUri,
                versionUri,
                page,
                size,
                tag
            } = params;

            
            const category = categoryUri ? categoryUri : 'global';
            const indexAcu = this.apiData[category][versionUri];

            const acuData = {
                tipoAcumulado: 1,
                name: title,
                articles: newAcuArticlesSourceSection.content_elements,
                paginator: newAcuArticlesSourceSection.next,
                total: newAcuArticlesSourceSection.count,
                configuration: configuration,
                tag
            };

            const transformedAcu = indexAcu(acuData);

            if (page * size - size > 16) {
                delete transformedAcu[0].banners;
            }

            const paginationValue = calculatePaginationValue(
                transformedAcu[0].acumuladoTotal,
                size,
                page
            );
            return acuTransformV2Format(transformedAcu, slug, paginationValue);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}
export default Consumer(AccumulatedSectionsMobileV2);
