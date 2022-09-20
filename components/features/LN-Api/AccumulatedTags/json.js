import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV2 from '../../../private/LN/api/v2/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
import get from '../../../private/common/utils/get';

// URL de ejemplo: http://localhost/api/v1/notas/byTag/cronicas-tid61570/params=size:1;page:1/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/notas\/byTag\/((?!params).+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado

class AccumulatedTags {
    constructor(props) {
        this.props = props;

        const {
            isAdmin,
            customFields: { size: sizeCf, page: pageCf, paramUrlId }
        } = props;

        this.state = {};

        const { size, page } = getSizesFrom(
            isAdmin,
            sizeCf,
            pageCf,
            paramUrlId,
            this.props.requestUri
        );

        const slug = get(
            this.props.globalContent,
            'Payload.items[0].slug',
            null
        );

        this.fetchContent({
            acuArticlesSource: {
                source: 'acuArticlesSource',
                query: {
                    sectionId: null,
                    tagId: slug,
                    author: null,
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
            const { acuArticlesSource, globalContent: configuration } =
                this.state || {};

            const { requestUri } = this.props;

            const indexAcu = this.apiData[browser.getApiType(requestUri)][
                browser.getApiVersion(requestUri)
            ];
            if (!acuArticlesSource || !acuArticlesSource.content_elements) {
                // eslint-disable-next-line no-console
                console.warn(
                    `Empty content result. Global content info: ${JSON.stringify(
                        this.props.globalContent
                    )}`
                );
                return null;
            }

            const dataTag = {
                slug: this.props.globalContent.Payload.items[0].slug,
                text: this.props.globalContent.Payload.items[0].name
            };

            const acuDataTag = {
                tipoAcumulado: 2,
                name: dataTag.text,
                articles: acuArticlesSource.content_elements,
                paginator: acuArticlesSource.next,
                total: acuArticlesSource.content_elements.length,
                tag: dataTag,
                configuration
            };

            return indexAcu(acuDataTag);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(AccumulatedTags);
