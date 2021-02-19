import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';

class JsonLastNews {
    constructor(props) {
        this.props = props;

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^/api/v([1]+)/notas/byId/(.+)/$
        this.versions = {
            1: IndexAcuV1
        };
    }

    render() {
        const indexAcu = this.versions[
            browser.getApiVersion(this.props.requestUri)
        ];
        const { globalContent } = this.props;

        try {
            const acuData = {
                name: 'Ultimas Noticias',
                articles: globalContent.content_elements,
                paginator: 1,
                total: globalContent.count
            };

            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(JsonLastNews);
