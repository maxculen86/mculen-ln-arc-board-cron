import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/components/chains/LN10/getCajaManual';
import validateCajaManual from './common/_helper-WebApi';
import { validateChildrensApi } from '../../private/LN/api/global/components/common/utils/_helpers';

class CajaManual extends GetCajaManual {
    constructor(props) {
        super(props, null);
    }

    validate = propsValidate => {
        const {
            id: chainId,
            customFields: { layout = '' },
            renderables = []
        } = propsValidate;

        let childrenRenders = renderables.find(
            x => get(x, 'props.id', null) === chainId
        );

        childrenRenders = childrenRenders && childrenRenders.children;
        /*         const childrenRendersProps = childrenRenders.map(x => x.props);
         */
        return validateCajaManual(layout, childrenRenders);
    };

    render() {
        try {
            const { containerImage } = this.state || {};
            const { children } = this.props;
            if (!validateChildrensApi(children)) {
                return null;
            }
            const error = this.validate(this.props);
            if (error) {
                return null;
            }
            if (
                this.props.customFields &&
                this.props.customFields.hideCaja == null
            ) {
                this.props.customFields.hideCaja =
                    this.props.customFields.hideBox || false;
            }
            return this.renderResponse(this.props, containerImage);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaManual);
