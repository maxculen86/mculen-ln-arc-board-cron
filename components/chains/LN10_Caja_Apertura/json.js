import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/home/chains/getCajaManual';
import getChildrenBySection from '../../private/LN/common/utils/LN10/getChildrenBySection';
import sectionValidation from '../../layouts/config/LN10-Home.config.json';
import checkChildInSection from '../../private/LN/common/utils/LN10/checkChildBySection';
import { validateChain } from './common/_helper-WebApi';
import respChain from '../../private/LN/api/global/home/chains/respChain';

class CajaApertura {
    constructor(props) {
        this.props = props;
        this.props.typeChain = 'apertura';
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

        const openingChildren = getChildrenBySection({
            renderables,
            section: {
                title: 'Apertura',
                validation: sectionValidation
            }
        });
        let childrenRenders = openingChildren.find(
            x => get(x, 'props.id', null) === chainId
        );
        childrenRenders = childrenRenders && childrenRenders.children;
        const isInOpening = checkChildInSection(chainId, openingChildren);
        return validateChain(childrenRenders, layout, isInOpening);
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
            return respChain(containerImage, this.props);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaApertura);
