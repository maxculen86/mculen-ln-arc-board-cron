import Consumer from 'fusion:consumer';
import { isInSection, getErrorMessage } from './common/_helper-WebApi';

class AnexoFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { id, customFields = {} } = this.props;
        const {
            hideByHtml = false,
            hideByUrl = false,
            url,
            heightMobile,
            html,

            // Roof properties
            title,
            link,
            hideTitle
        } = customFields;

        const isApertura = isInSection({
            sectionName: 'Pre_Apertura',
            id,
            renderables: this.props.renderables
        });

        const errorMessage = getErrorMessage({
            isApertura,
            customFields
        });
        if (errorMessage || (hideByHtml && hideByUrl)) {
            return null;
        }
        let resp = {};
        let articles = [];
        let hideCaja = true;

        const information = {
            hideCaja,
            layout: 'grilla1'
        };

        const urlAnexo = (url && url.trim()) || '';
        if (!hideByHtml && html) {
            information.hideCaja = false;
            articles = [{ html }];
        }
        if (!hideByUrl && urlAnexo && heightMobile) {
            information.hideCaja = false;
            articles = urlAnexo !== '' ? [{ url, alto: heightMobile }] : [];
        }

        if (!hideTitle) {
            information.title = title;
            information.link = link;
        }

        resp = {
            information,
            articles
        };

        return resp;
    }
}

export default Consumer(AnexoFeature);
