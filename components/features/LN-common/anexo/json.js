import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
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
            html
        } = customFields;

        const isApertura = isInSection({
            sectionName: 'Anexo_1',
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
        const urlAnexo = (url && url.trim()) || '';
        if (!hideByHtml && html) {
            hideCaja = false;
            articles = [{ html }];
        }
        if (!hideByUrl && urlAnexo && heightMobile) {
            hideCaja = false;
            articles = urlAnexo !== '' ? [{ url, alto: heightMobile }] : [];
        }
        resp = {
            information: {
                hideCaja,
                layout: 'grilla1'
            },
            articles
        };

        return resp;
    }
}
/* const adjustByHTML = 'Ajuste por HTML';
AnexoFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        hideByHtml: PropTypes.bool.tag({
            label: 'Ocultar',
            group: adjustByHTML,
            description: 'Marque para ocultar el anexo',
            defaultValue: false
        })
    }).isRequired
}; */
export default Consumer(AnexoFeature);
