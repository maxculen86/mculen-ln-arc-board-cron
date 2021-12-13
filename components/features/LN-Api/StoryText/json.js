import Consumer from 'fusion:consumer';
import IndexNotaMobileV1Text from '../../../private/LN/api/v1/mobile/storyText';
import browser from '../../../private/common/utils/browser';

class StoryText {
    constructor(props) {
        this.props = props;

        // Responde al resolver que permite pasar las versiones existentes
        // Regex actual: ^\/api\/mobile\/v([1])\/notas\/text\/(byId\/(.+)|byUrl\/(.+))(\/.*)$

        this.apiData = {
            mobile: {
                1: IndexNotaMobileV1Text
            }
        };
    }

    render() {
        const indexNota = this.apiData[
            browser.getApiType(this.props.requestUri)
        ][browser.getApiVersion(this.props.requestUri)];
        const { globalContent } = this.props;
        try {
            return indexNota(globalContent);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(StoryText);
