import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';

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

        this.fetchContent({
            dataResp: {
                source: 'acuArticlesSource',
                query: {
                    sectionId: id,
                    imageConfig: 'notaM',
                    size,
                    page
                }
            }
        });

        this.versions = {
            1: IndexAcuV1,
            Default: IndexAcuV1
        };
    }

    render() {
        if (!this.state.dataResp || !this.state.dataResp.content_elements)
            return null;
        const articles = this.state.dataResp.content_elements;
        const {
            globalContent: { name }
        } = this.props;

        const indexAcu =
            this.versions[browser.getApiVersion(this.props.requestUri)] ||
            this.versions.Default;

        return indexAcu(name, articles, this.state.dataResp.next > 0);
    }
}

export default Consumer(AcuSection);
