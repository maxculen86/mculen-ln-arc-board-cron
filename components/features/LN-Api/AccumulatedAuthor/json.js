import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
// URL de ejemplo: http://localhost/api/v1/notas/byAuthor/Ignacio%20Madrid/params=size:12;page:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/notas\/byAuthor\/(.+)\/(params.+)\/(.*)$ , donde "params" dependera del customField "paramUrlId" configurado

class AccumulatedAuthor {
    constructor(props) {
        this.props = props;

        const {
            globalContent: { _id: id },
            isAdmin,
            customFields: { size: sizeCf, page: pageCf, paramUrlId },
            requestUri
        } = props;

        this.state = {};

        const { size, page } = getSizesFrom(
            isAdmin,
            sizeCf,
            pageCf,
            paramUrlId,
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
                    page,
                    api: true
                }
            }
        });

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

            const { globalContent: author, requestUri } = this.props;
            const indexAcu = this.apiData[browser.getApiType(requestUri)][
                browser.getApiVersion(requestUri)
            ];

            if (!acuArticlesSource || !acuArticlesSource.content_elements) {
                return null;
            }
            const paginator = acuArticlesSource.next;
            let page = 1;
            if (paginator) {
                page = Math.floor(
                    paginator / acuArticlesSource.content_elements.length
                );
            }
            const acuData = {
                tipoAcumulado: 3,
                name: author.byline,
                articles: acuArticlesSource.content_elements,
                paginator,
                page,
                total: acuArticlesSource.count,
                author
            };
            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(AccumulatedAuthor);
