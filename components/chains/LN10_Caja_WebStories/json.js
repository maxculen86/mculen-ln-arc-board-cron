import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaManual from '../../private/LN/api/global/components/chains/LN10/getCajaManual';
import { validateChildrensApi } from '../../private/LN/api/global/components/common/utils/_helpers';
import {
    validateChain,
    filterWebStoriesChildren
} from './common/_helper-WebApi';

class CajaWebStories extends GetCajaManual {
    constructor(props) {
        super(props, 'webstories');
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
    validate = ({ id: chainId, renderables = [], children }) => {
        const childrenRenders = renderables
            .find(x => get(x, 'props.id', null) === chainId)
            .children.map(child => ({
                ...child,
                key: child.props.id
            }));

        const filteredChildren = filterWebStoriesChildren(
            renderables,
            childrenRenders
        );

        return validateChain(filteredChildren, children);
    };

    render() {
        try {
            const { children, customFields: { layout = '' } = {} } = this.props;

            if (!validateChildrensApi(children)) {
                return null;
            }

            const error = this.validate(this.props);

            if (error) {
                // eslint-disable-next-line
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
            return {
                information: {
                    ...this.props.customFields,
                    typeChain: this.props.typeChain
                },
                articles: children
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaWebStories);
