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

        let size = !isAdmin
            ? Number.parseInt(
                  browser.getParamFrom(
                      paramUrlId,
                      'size',
                      this.props.requestUri
                  ),
                  10
              )
            : sizeCf;

        if (size > 100) size = 100;
        
        const page = !isAdmin
            ? Number.parseInt(
                  browser.getParamFrom(
                      paramUrlId,
                      'page',
                      this.props.requestUri
                  ),
                  10
              )
            : pageCf;

        if (isMigratedCategory(id, true)) {
            this.fetchContent({
                acuArticlesSource: {
                    source: 'acuArticlesSource',
                    query: {
                        sectionId: id,
                        imageConfig: 'notaM',
                        size,
                        page
                    }
                }
            });

            this.fetchContent({
                sectionSource: {
                    source: 'sectionSource',
                    query: {
                        id: id
                    },
                    transform(data) {
                        if (data && data.acumuladoColor) {
                            return data.acumuladoColor;
                        } else {
                            return {};
                        }
                    }
                }
            });
        } else {
            this.state = { ...this.state, categoryMigrated: false };
        }

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^\/api\/v([1]+)\/notas\/bySection(\/((?!params).)+)\/(.*\/)$
        this.versions = {
            1: IndexAcuV1
        };
    }

    render() {
        if (!this.state.acuArticlesSource && !this.state.categoryMigrated) {
            return {
                success: false,
                message:
                    'Esta categoria aún no ha sido migrada, debe de consultar en Api Contenidos',
                code: 202
            };
        }

        if (
            !this.state.acuArticlesSource ||
            !this.state.acuArticlesSource.content_elements
        )
            return null;

        const {
            acuArticlesSource: { count: total },
            acuArticlesSource: { next: paginator },
            acuArticlesSource: { content_elements: articles },
            sectionSource: { configuration }
        } = this.state || {};

        const {
            globalContent: { name }
        } = this.props;

        const acuData = {
            name,
            articles,
            paginator,
            total,
            configuration
        };

        const indexAcu = this.versions[
            browser.getApiVersion(this.props.requestUri)
        ];

        return indexAcu(acuData);
    }
}

export default Consumer(AcuSection);
