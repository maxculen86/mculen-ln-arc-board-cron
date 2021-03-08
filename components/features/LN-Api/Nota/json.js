import Consumer from 'fusion:consumer';
import IndexNotaV1 from '../../../private/LN/api/v1/nota';
import browser from '../../../private/common/utils/browser';

class JsonArticle {
    constructor(props) {
        this.props = props;

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^/api/v([1]+)/notas/byId/(.+)/$
        this.versions = {
            1: IndexNotaV1
        };
    }

    render() {
        const indexNota = this.versions[
            browser.getApiVersion(this.props.requestUri)
        ];
        const { globalContent } = this.props;
        try {
            return indexNota(globalContent);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(JsonArticle);
