import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';

// URL de ejemplo: http://localhost/api/v1/notas/lastNews/?_website=la-nacion-ar&outputType=json
class JsonLastNews {
    constructor(props) {
        this.props = props;

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
                tipoAcumulado: 4,
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
