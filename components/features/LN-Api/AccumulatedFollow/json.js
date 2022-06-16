import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/global/accumulated';
import IndexAcuV1Mobile from '../../../private/LN/api/v1/mobile/accumulated';
import browser from '../../../private/common/utils/browser';

// URL de ejemplo por token: http://localhost/pf/api/v1/notas/seguir/1F8794A8-BE03-48F9-B023-74356CE9C9F5/3/params=size:30;page:1/?_website=la-nacion-ar&outputType=json
// URL de ejemplo por autor: http://localhost/pf/api/v2/notas/seguir/byautor/ricardo-sametband-268/20/params=size:1;page:2/?_website=la-nacion-ar&outputType=json
//  Regex Resolver: ^\/api\/(?:mobile\/)?v([1-2]+)\/notas\/seguir\/(([A-Za-z0-9-]+)?|((byseccion\/([a-z-]+))|(bytag\/([a-z0-9-]+))|(byautor\/([a-z0-9-]+))))?\/(\d+)(\/params=(size:(\d+)[;]?)?(page:(\d+)[;]?)?)?\/$
class AccumulatedFollow {
    constructor(props) {
        this.props = props;

        this.state = {};

        this.apiData = {
            global: {
                1: IndexAcuV1
            },
            mobile: {
                1: IndexAcuV1Mobile
            }
        };
    }

    render() {
        try {
            const {
                globalContent,
                requestUri,
                globalContent: { followedItems }
            } = this.props;

            const indexAcu = this.apiData[browser.getApiType(requestUri)][
                browser.getApiVersion(requestUri)
            ];

            if (!globalContent || !globalContent.content_elements) {
                return null;
            }
            const followedItemsValidate = followedItems.filter(x => x.id !== 0);
            const paginator = globalContent.next;
            let page = 1;
            if (paginator) {
                page = Math.floor(
                    paginator / globalContent.content_elements.length
                );
            }
            const acuData = {
                tipoAcumulado: 10,
                name: 'follow',
                articles: globalContent.content_elements,
                paginator,
                page,
                total: globalContent.count,
                followedItemsValidate
            };

            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(AccumulatedFollow);
