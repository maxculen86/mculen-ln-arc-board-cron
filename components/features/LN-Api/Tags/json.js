import get from 'lodash.get';
import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';

// URL de ejemplo: http://localhost/api/v1/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v1\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado

class AcuTag {
    constructor(props) {
        this.props = props;
        const {
            globalContent: { _id: id },
            isAdmin,
            customFields: { size: sizeCf, page: pageCf, paramUrlId }
        } = props;

        this.state = {};

        slug;

        console.log('isAdmin', isAdmin);
        console.log('sizeCf', sizeCf);
        console.log('paramUrlId', paramUrlId);
        console.log('paramUrlId', this.props.requestUri);

        // sectionId,
        // tagId,
        // size,
        // page,
        // website,

        let size = browser.getSizesFrom(
            isAdmin,
            sizeCf,
            paramUrlId,
            'size',
            this.props.requestUri
        );

        if (size > 100) size = 100;

        const page = browser.getSizesFrom(
            isAdmin,
            pageCf,
            paramUrlId,
            'page',
            this.props.requestUri
        );

        this.fetchContent({
            tagSource: {
                source: 'tagSource',
                query: {
                    slug: 'cronicas-tid61570'
                    // sectionId: id,
                    // imageConfig: 'm',
                    // size,
                    // page
                }
            }
        });

        this.versions = {
            1: IndexAcuV1
        };
    }

    render() {
        //return this.props.globalContent;
        try {
            const { tagSource, globalContent: configuration } =
                this.state || {};

            const {
                globalContent: { name },
                requestUri
            } = this.props;

            const indexAcu = this.versions[browser.getApiVersion(requestUri)];

            if (!tagSource || !tagSource.content_elements) {
                return null;
            }

            const acuDataTag = {
                name,
                articles: tagSource.content_elements,
                paginator: tagSource.next,
                total: tagSource.count,
                configuration
            };
            //return this.props.globalContent;
            return indexAcu(acuDataTag);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(AcuTag);
