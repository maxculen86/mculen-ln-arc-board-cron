import get from 'lodash.get';
import Consumer from 'fusion:consumer';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';
import { isMigratedCategory } from '../../../private/common/utils/migratedCategoriesHelper';
import getSizesFrom from '../../../private/common/utils/getSizesFrom';
// URL de ejemplo: http://localhost/api/v1/notas/bySection/recetas/params=size:12;page:120/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v1\/notas\/bySection(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado
class AcuSection {
    constructor(props) {
        this.props = props;
        const {
            globalContent: { _id: id },
            isAdmin,
            customFields: { size: sizeCf, page: pageCf, paramUrlId }
        } = props;
        this.state = {};
        const categoryMigrated = isMigratedCategory(id, true);
        if (!categoryMigrated) {
            throw new Error(
                `La categoria '${id}' no posee la propiedad migration`
            );
        }
        const { size, page } = getSizesFrom(
            isAdmin,
            sizeCf,
            pageCf,
            paramUrlId,
            this.props.requestUri
        );
        this.fetchContent({
            acuArticlesSource: {
                source: 'acuArticlesSource',
                query: {
                    sectionId: id,
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
            const { acuArticlesSource, globalContent: configuration } =
                this.state || {};
            const {
                globalContent: { name },
                requestUri
            } = this.props;
            const indexAcu = this.versions[browser.getApiVersion(requestUri)];
            if (!acuArticlesSource || !acuArticlesSource.content_elements) {
                return null;
            }
            const acuData = {
                tipoAcumulado: 1,
                name,
                articles: acuArticlesSource.content_elements,
                paginator: acuArticlesSource.next,
                total: acuArticlesSource.count,
                configuration
            };
            return indexAcu(acuData);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}
export default Consumer(AcuSection);
