import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import { getHrefLink } from '../../LN-common/Juego/helper';

class DSCardPromo {
    constructor(props) {
        this.props = props;
        this.type = props.customFields?.type || 'Externo';
        const { sectionId } = props.customFields || {};

        if (sectionId && this.type === 'Interno') {
            this.fetchContent({
                lnAcuSource: {
                    source: 'lnAcuSource',
                    query: {
                        sectionId,
                        size: 1,
                        website: this.props.arcSite
                    }
                }
            });
        }
    }

    render() {
        try {
            const { lnAcuSource: articleData } = this.state || {};
            const {
                customFields: { sectionId, subscriber, isNew }
            } = this.props;
            const articleLink = get(
                articleData,
                'content_elements[0].website_url',
                null
            );
            const hrefLink = articleLink
                ? getHrefLink(this.type, sectionId, articleLink)
                : null;
            const badge = isNew === 'NUEVO' ? isNew : null;

            return { closed: subscriber, id: hrefLink || sectionId, badge };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(DSCardPromo);
