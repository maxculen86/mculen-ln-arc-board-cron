import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';

class SectionMayInterest {
    constructor(props) {
        this.props = props;

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^\/api\/v([1]+)\/notas\/mayInterest\/(\d+)(\/.*)$
        // this.versions = {
        //     1: IndexMayInterestV1
        // };
        this.versions = {
            1: IndexAcuV1
        };
    }

    render() {
        try {
            const { globalContent } = this.props;

            const {
                globalContent: { name },
                requestUri
            } = this.props;

            const indexAcu = this.versions[browser.getApiVersion(requestUri)];

            const acuData = {
                name: 'Te puede interesar',
                tipoAcumulado: 1,
                total: globalContent.length,
                articles: globalContent
            };

            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(SectionMayInterest);
