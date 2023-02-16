import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/home/chains/getCajaManual';
import getDataChainManualWebApi from '../utils/common/getDataChainManual-WebApi';
import respChain from '../../private/LN/api/global/home/chains/respChain';

class CajaManual {
    constructor(props) {
        this.props = props;
        this.props.typeChain = 'chainManual';
        this.Chain = Consumer(
            new GetCajaManual(this.props, this.props.typeChain, this.validate)
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
            if (
                this.props.customFields &&
                this.props.customFields.hideCaja == null
            ) {
                this.props.customFields.hideCaja =
                    this.props.customFields.hideBox || false;
            }

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
