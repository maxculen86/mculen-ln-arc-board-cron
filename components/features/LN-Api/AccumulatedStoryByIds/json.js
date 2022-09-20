import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';

// URL de ejemplo: http://localhost/api/v1/notas/byIds/236DDMMNYVFNFC4PZQPP4AK6XI,2375VFXVGZBNZDLXL5CTHUVTMQ,23CPLUXGMFF2RBADC62EYLXH4M/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/notas\/byIds\/((?!params).+)\/$ , donde "?!params" debera ir la lista de Id de story separadas por coma

class AccumulatedStoryByIds {
    constructor(props) {
        this.props = props;
        this.state = { acuArticlesSource: null };
        this.state.acuArticlesSource = this.props.globalContent;

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

    render() {
        try {
            const { acuArticlesSource } = this.state || {};

            const { requestUri } = this.props;
            const indexAcu = this.apiData[browser.getApiType(requestUri)][
                browser.getApiVersion(requestUri)
            ];
            if (!acuArticlesSource || !acuArticlesSource.content_elements) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Empty content result. Props info: ${JSON.stringify(
                        this.props
                    )}`
                );
                return null;
            }
            const acuData = {
                tipoAcumulado: 4,
                name: 'Acumulados Notas por Ids',
                articles: acuArticlesSource.content_elements,
                paginator: acuArticlesSource.next,
                total: acuArticlesSource.count
            };
            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(AccumulatedStoryByIds);
