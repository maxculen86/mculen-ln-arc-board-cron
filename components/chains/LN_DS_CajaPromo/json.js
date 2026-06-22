import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import { getGameDiagramationItems, validateGamesChain } from './common/_helper';

class LNDSCajaPromo {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const { layout, customFields, children } = this.props;

            const items = children;

            const error = validateGamesChain(layout, customFields, items);

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
                this.props.customFields.hideCaja = false;
            }
            return {
                information: {
                    ...this.props.customFields,
                    url: get(this.props.customFields, 'link', null)
                },
                items: getGameDiagramationItems(children, customFields.layout)
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(LNDSCajaPromo);
