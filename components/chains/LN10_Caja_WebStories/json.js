import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/components/chains/LN10/getCajaManual';
import validateCajaManual from '../LN10_Caja_Manual/common/_helper-WebApi';
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
        // TODO ser mas descriptivo con la funcion, ver back
        let childrenRenders = renderables.find(
            x => get(x, 'props.id', null) === chainId
        );
        // TODO ver si comment es necesario
        childrenRenders = childrenRenders && childrenRenders.children;
        /*         const childrenRendersProps = childrenRenders.map(x => x.props);
         */
        return validateCajaManual(layout, childrenRenders);
    };

    render() {
        try {
            const { containerImage } = this.state || {};
            const { children, customFields: { layout = '' } = {} } = this.props;
            if (!validateChildrensApi(children)) {
                return null;
            }
            const error = this.validate(this.props);
            if (error) {
                console.warn(
                    `${layout} - ${
                        typeof error === 'object' ? JSON.stringify(error) : ''
                    }`
                );
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
