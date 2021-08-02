import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
// URL de ejemplo: http://localhost/api/v1/notas/byAuthor/Ignacio%20Madrid/params=size:12;page:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/notas\/byAuthor\/(.+)\/(params.+)\/(.*)$ , donde "params" dependera del customField "paramUrlId" configurado

class AccumulatedStoryByIds {
    constructor(props) {
        this.props = props;
        this.state = { acuArticlesSource: null };
        this.state.acuArticlesSource = this.props.globalContent;

        this.versions = {
            1: IndexAcuV1
        };
    }

    render() {
        try {
            const { acuArticlesSource } = this.state || {};

            const { globalContent: type, requestUri } = this.props;
            const indexAcu = this.versions[browser.getApiVersion(requestUri)];

            if (!acuArticlesSource || !acuArticlesSource.content_elements) {
                return null;
            }
            const acuData = {
                tipoAcumulado: 0,
                name: type.type,
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
