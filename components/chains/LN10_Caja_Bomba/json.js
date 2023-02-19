import Consumer from 'fusion:consumer';
import GetCajaManual from '../../private/LN/api/global/home/chains/LN10/getCajaManual';
import { getChildrenFromSectionHome } from '../../private/LN/common/utils/cajaTemasHelperLN10-WebApi';
import { validateChainBomba, getIsPreOpening } from './common/_helper-WebApi';
import { validateChildrensApi } from '../utils/common/_helpers-WebApi';

class CajaBomba extends GetCajaManual {
    constructor(props) {
        super(props, 'bomba');
    }

    validate = propsValidate => {
        const {
            id: chainId,
            customFields: { layout = 'vertical' } = {},
            children,
            renderables = []
        } = propsValidate;

        const preOpeningChildren = getChildrenFromSectionHome(
            renderables,
            'Pre_Apertura',
            1
        );
        const isPreOpening = getIsPreOpening(preOpeningChildren, chainId);
        return validateChainBomba(layout, children, isPreOpening);
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

export default Consumer(CajaBomba);
