import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/components/chains/LN10/getCajaManual';
import validateCajaManual from './common/_helper-WebApi';
import { validateChildrensApi } from '../../private/LN/api/global/components/common/utils/_helpers';
import { LAYOUTS } from '../utils/common/_helpers-WebApi';
import getViewabilityRoof from '../utils/getViewabilityRoof';

const validate = propsValidate => {
    const { BN_6_GRID_MAS_TIMELINE, BN_PLAYER_1_MAS_3 } = LAYOUTS;
    const {
        id: chainId,
        customFields: { layout = '', chainStyle },
        renderables = []
    } = propsValidate;

    let childrenRenders = renderables.find(
        x => get(x, 'props.id', null) === chainId
    );

    const isGrid6MasTimeline =
        get(childrenRenders, 'props.customFields.layout', '') ===
        BN_6_GRID_MAS_TIMELINE;

    const isBnPlayer =
        get(childrenRenders, 'props.customFields.layout', '') ===
        BN_PLAYER_1_MAS_3;

    childrenRenders = childrenRenders && childrenRenders.children;

    return validateCajaManual({
        layout,
        childProps: childrenRenders,
        chainStyle,
        isGrid6MasTimeline,
        isBnPlayer
    });
};
class CajaManual extends GetCajaManual {
    constructor(props) {
        super(props, null);
    }

    render() {
        try {
            const { containerImage } = this.state || {};
            const { children, customFields: { layout = '' } = {} } = this.props;
            if (!validateChildrensApi(children)) {
                return null;
            }
            const error = validate(this.props);
            if (error) {
                console.warn(
                    `${layout} - ${typeof error === 'object' ? JSON.stringify(error) : ''
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

            const {
                id: chainId,
                renderables = [],
                customFields: propsForRoof = {}
            } = this.props || {};

            const viewabilityRoof = getViewabilityRoof(
                chainId,
                renderables,
                propsForRoof
            );

            return this.renderResponse(
                { ...this.props, viewabilityRoof },
                containerImage
            );
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaManual);
