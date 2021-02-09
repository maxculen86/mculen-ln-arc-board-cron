import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';
import Author from '../../../private/LN/api/v1/common/authorAcu';
import getArticlesFromElement from '../../../private/common/utils/getArticlesFromElement';
// URL de ejemplo: http://localhost/api/v1/notas/byAuthor/Ignacio%20Madrid/params=size:12;page:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/notas\/byAuthor\/(.+)\/(params.+)\/(.*)$ , donde "params" dependera del customField "paramUrlId" configurado

class AuthorAcu {
    constructor(props) {
        this.props = props;

        const {
            globalContent: { _id: id },
            isAdmin,
            customFields: { size: sizeCf, page: pageCf, paramUrlId },
            requestUri
        } = props;

        this.state = {
            id,
            isAdmin,
            sizeCf,
            pageCf,
            paramUrlId,
            requestUri,
            fetchContent: this.fetchContent
        };

        /* const resp = getArticlesFromElement(
            id,
            isAdmin,
            sizeCf,
            pageCf,
            paramUrlId,
            requestUri
        );
*/

        let size = browser.getSizesFrom(
            isAdmin,
            sizeCf,
            paramUrlId,
            'size',
            requestUri
        );

        if (size > 100) size = 100;

        const page = browser.getSizesFrom(
            isAdmin,
            pageCf,
            paramUrlId,
            'page',
            requestUri
        );

        this.fetchContent({
            acuArticlesSource: {
                source: 'acuArticlesSource',
                query: {
                    sectionId: null,
                    authorId: id,
                    tagId: null,
                    imageConfig: 'm',
                    size,
                    page
                }
            }
        });

        this.versions = {
            1: IndexAcuV1
        };
    }

    render() {
        try {
            //const resp = getArticlesFromElement(this.state);

            const { acuArticlesSource, globalContent: configuration } =
                this.state || {};
            //return this.props.globalContent;
            const { globalContent: autor, requestUri } = this.props;

            const indexAcu = this.versions[browser.getApiVersion(requestUri)];

            if (!acuArticlesSource || !acuArticlesSource.content_elements) {
                return null;
            }
            //return acuArticlesSource.content_elements;
            const acuData = {
                tipoAcumulado: 3,
                name: autor.byline,
                articles: acuArticlesSource.content_elements,
                paginator: acuArticlesSource.next,
                total: acuArticlesSource.count,
                autor: Author(autor),
                configuration
            };

            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(AuthorAcu);
