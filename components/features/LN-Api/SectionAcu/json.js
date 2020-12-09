import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';
import { isMigratedCategory } from '../../../private/common/utils/migratedCategoriesHelper';

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
        if (categoryMigrated) {
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

            this.fetchContent({
                sectionSource: {
                    source: 'sectionSource',
                    query: {
                        id
                    },
                    transform(data) {
                        if (data && data.acumuladoColor) {
                            return data.acumuladoColor;
                        }
                        return {};
                    }
                }
            });
        }

        this.state = { ...this.state, categoryMigrated };

        this.versions = {
            1: IndexAcuV1
        };
    }

    render() {
        const {
            acuArticlesSource,
            sectionSource: configuration,
            categoryMigrated
        } = this.state || {};

        const {
            globalContent: { name }
        } = this.props;

        const indexAcu = this.versions[
            browser.getApiVersion(this.props.requestUri)
        ];

        if (!acuArticlesSource || !acuArticlesSource.content_elements)
            return null;

        if (!categoryMigrated) {
            return {
                success: false,
                message:
                    'Esta categoria aún no ha sido migrada, debe de consultar en Api Contenidos',
                code: 202
            };
        }

        const acuData = {
            name,
            articles: acuArticlesSource.content_elements,
            paginator: acuArticlesSource.next,
            total: acuArticlesSource.count,
            configuration
        };

        return indexAcu(acuData);
    }
}

export default Consumer(AcuSection);
