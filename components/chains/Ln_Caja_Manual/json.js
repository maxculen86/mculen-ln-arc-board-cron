import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/home/chains/LN/getCajaManual';
import { validateChildrensApi } from '../utils/common/_helpers-WebApi';

class CajaManual extends GetCajaManual {
    constructor(props) {
        super(props, null);
    }

    render() {
        try {
            const { containerImage } = this.state || {};
            const { children } = this.props;
            if (!validateChildrensApi(children)) {
                return null;
            }

            return this.renderResponse(this.props, containerImage);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaManual);
