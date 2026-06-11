import Consumer from 'fusion:consumer';
import { BackendLnError } from '../../../private/LN/api/common/models/backendLnError';
import validateHtmlFeature from './_helper';

class HtmlFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { id, customFields = {} } = this.props;
        const { hideAppMobile } = customFields;

        if (hideAppMobile) {
            return null;
        }

        const error = validateHtmlFeature({ customFields });

        if (error) {
            console.warn(
                new BackendLnError(
                    `LN-10/CardHtml - msj: ${JSON.stringify(error)} - ${JSON.stringify(customFields)}`
                )
            );

            return null;
        }

        const information = {
            nameFeature: 'LN-10/CardHtml',
            idRender: id,
            hideCaja: false
        };

        const { html, heightDesktop, heightTablet, heightMobile } =
            customFields;

        return {
            information,
            id,
            html,
            heightDesktop,
            heightTablet,
            heightMobile
        };
    }
}

export default Consumer(HtmlFeature);
