import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';

// URL de ejemplo: http://localhost/api/v1/notas/mayInterest/model/b4dd939b-0bf3-463b-bdc2-1613736289225/3/?_website=la-nacion-ar&outputType=json
class MayInterest {
    constructor(props) {
        this.props = props;

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^\/api\/v([1]+)\/notas\/mayInterest\/(\d+)(\/.*)$
        // this.versions = {
        //     1: IndexMayInterestV1
        // };
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
            const { globalContent } = this.props;

            const { requestUri } = this.props;

            const indexAcu = this.apiData[browser.getApiType(requestUri)][
                browser.getApiVersion(requestUri)
            ];
            if (globalContent && globalContent?.status) {
                return globalContent;
            }
            const acuData = {
                name: 'Te puede interesar',
                total: globalContent.length,
                articles: globalContent
            };

            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(MayInterest);
