import Consumer from 'fusion:consumer';
import isTodayEnabled from '../../../chains/utils/isTodayEnabled';
import { isInSection, getErrorMessage } from './common/_helper-WebApi';

const LAYOUT = 'LN10-Home_Main';

const shouldSkipRender = ({ enabledDays = [], isHome = false }) =>
    isHome && (enabledDays.length === 0 || !isTodayEnabled(enabledDays));

class AnexoFeature {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { id, layout, customFields = {} } = this.props;

        const {
            // flags de visibilidad
            hideByHtml = false,
            hideByUrl = false,
            hideByVivoYoutube = false,
            // fuentes de contenido
            url,
            heightMobile,
            html,
            vivoYoutube,
            // “roof” properties
            title,
            link,
            hideTitle,
            enabledDays = []
        } = customFields;

        const isHome = layout === LAYOUT;

        if (shouldSkipRender({ enabledDays, isHome })) {
            return null;
        }

        const isApertura = isInSection({
            sectionName: 'Pre_Apertura',
            id,
            renderables: this.props.renderables
        });

        const errorMessage = getErrorMessage({
            isApertura,
            customFields
        });

        if (errorMessage || (hideByHtml && hideByUrl && hideByVivoYoutube)) {
            return null;
        }

        let articles = [];
        const information = {
            hideCaja: true,
            layout: 'grilla1'
        };

        const urlAnexo = (url && url.trim()) || '';

        if (!hideTitle) {
            information.title = title;
            information.link = link;
        }

        if (!hideByHtml && html) {
            information.hideCaja = false;
            articles = [{ html }];
            return { information, articles };
        }

        if (!hideByVivoYoutube && vivoYoutube) {
            information.hideCaja = false;
            articles = [{ html: vivoYoutube }];
            return { information, articles };
        }

        if (!hideByUrl && urlAnexo && heightMobile) {
            information.hideCaja = false;
            articles = urlAnexo !== '' ? [{ url, alto: heightMobile }] : [];
            return { information, articles };
        }

        return { information, articles };
    }
}

export default Consumer(AnexoFeature);
