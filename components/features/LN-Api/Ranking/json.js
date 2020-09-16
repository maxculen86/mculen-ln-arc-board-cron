import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import IndexAcuV1 from '../../../private/LN/api/v1/acumulado';
import browser from '../../../private/common/utils/browser';

// URL de ejemplo: http://localhost/api/v1/ranking/bySection/recetas/size/5/web/la-nacion-ar/?_website=la-nacion-ar&outputType=json
// Resolver: ^\/api\/v([1]+)\/ranking\/bySection\/size\/web(\/((?!params).)+)\/(.*\/)$ , donde "params" dependera del customField "paramUrlId" configurado

class RankingSection {
    constructor(props) {
        this.props = props;

        const {
            globalContent: { _id: id },
            isAdmin,
            customFields: { size: sizeCf, page: pageCf, paramUrlId }
        } = props;
        
        this.state = {};

        console.log(props)

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

        // this.fetchContent({
        //     dataResp: {
        //         source: 'acuArticlesSource',
        //         query: {
        //             sectionId: id,
        //             imageConfig: 'notaM',
        //             size,
        //             page
        //         }
        //     }
        // });

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^\/api\/v([1]+)\/notas\/bySection(\/((?!params).)+)\/(.*\/)$
        this.versions = {
            1: IndexAcuV1
        };
    }

    render() {

        const indexAcu = this.versions[
            browser.getApiVersion(this.props.requestUri)
        ];

        return "Hola";
        // if (!this.state.dataResp || !this.state.dataResp.content_elements)
        //     return null;
        // const articles = this.state.dataResp.content_elements;
        // const {
        //     globalContent: { name }
        // } = this.props;

        // const indexAcu = this.versions[
        //     browser.getApiVersion(this.props.requestUri)
        // ];

        // return indexAcu(name, articles, this.state.dataResp.next > 0);
    }
}

export default Consumer(RankingSection);
