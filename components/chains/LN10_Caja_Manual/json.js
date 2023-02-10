import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/home/chains/getCajaManual';
import getDataChainManualWebApi from '../utils/common/getDataChainManual-WebApi';
import respChain from '../../private/LN/api/global/home/chains/respCajaCollection';

class CajaManual {
    constructor(props) {
        this.props = props;

        this.Chain = Consumer(
            new GetCajaManual(this.props, 'apertura', this.validate)
        );
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
        const childrenRendersProps = childrenRenders.map(x => x.props);
        const {
            filteredChildren,
            isInApertura,
            isMultimedia,
            features,
            error
        } = getDataChainManualWebApi({
            featureId: chainId,
            renderables,
            childProps: childrenRendersProps,
            children: childrenRenders,
            layout
        });

        return error;
    };

    render() {
        try {
            const { containerImage } = this.Chain.state || {};

            if (this.Chain.error) {
                return null;
            }
            return respChain(containerImage, this.props);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaManual);
