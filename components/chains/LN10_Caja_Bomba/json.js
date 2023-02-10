import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/home/chains/getCajaManual';
import { getChildrenFromSectionHome } from '../../private/LN/common/utils/cajaTemasHelperLN10-WebApi';
import { validateChainBomba, getIsPreOpening } from './_helper';
import respChain from '../../private/LN/api/global/home/chains/respCajaCollection';

class CajaBomba {
    constructor(props) {
        this.props = props;
        this.Chain = Consumer(
            new GetCajaManual(this.props, 'bomba', this.validate)
        );
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
            const { containerImage } = this.Chain.state || {};
            return respChain(containerImage, this.props);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaBomba);
