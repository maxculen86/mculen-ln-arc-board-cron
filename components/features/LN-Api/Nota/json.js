import Consumer from 'fusion:consumer';
import IndexNotaV1 from '../../../private/LN/api/v1/nota';
import browser from '../../../private/common/utils/browser';

class JsonArticle {
    constructor(props) {
        this.props = props;

        this.versions = {
            1: IndexNotaV1,
            Default: IndexNotaV1
        };
    }

    render() {
        const indexNota =
            this.versions[browser.getApiVersion(this.props.requestUri)] ||
            this.versions.Default;

        const { globalContent } = this.props;
        return indexNota(globalContent);
    }
}

export default Consumer(JsonArticle);
