import Consumer from 'fusion:consumer';
import IndexMayInterestV1 from '../../../private/LN/api/v1/mayInterest';
import browser from '../../../private/common/utils/browser';

class SectionMayInterest {
    constructor(props) {
        this.props = props;

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^\/api\/v([1]+)\/notas\/mayInterest\/(\d+)(\/.*)$
        this.versions = {
            1: IndexMayInterestV1
        };
    }

    render() {
        try {
            const { globalContent, requestUri } = this.props;
            const indexMayInterestV1 = this.versions[
                browser.getApiVersion(requestUri)
            ];
            return indexMayInterestV1(globalContent);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(SectionMayInterest);
