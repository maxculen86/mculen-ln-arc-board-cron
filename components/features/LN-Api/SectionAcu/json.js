import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import IndexAcu from '../../../private/LN/api/acumulado';
import browser from '../../../private/common/utils/browser';

class AcuSection {
    constructor(props) {
        this.props = props;
        const {
            globalContent: { _id: id },
            isAdmin,
            customFields: { size: sizeCf, page: pageCf }
        } = props;
        this.state = {};
        let size = !isAdmin
            ? Number.parseInt(
                  browser.getParameterByName('size', this.props.requestUri),
                  10
              )
            : sizeCf;
        if (size > 100) size = 100;
        const page = !isAdmin
            ? Number.parseInt(
                  browser.getParameterByName('page', this.props.requestUri),
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
    }

    render() {
        if (!this.state.dataResp || !this.state.dataResp.content_elements)
            return null;
        const articles = this.state.dataResp.content_elements;
        const {
            globalContent: { name }
        } = this.props;

        return IndexAcu(name, articles, this.state.dataResp.next > 0);
    }
}

export default Consumer(AcuSection);
