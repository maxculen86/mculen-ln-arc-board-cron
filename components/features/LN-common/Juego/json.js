import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import { getHrefLink } from './helper';

class JuegoFeature {
    constructor(props) {
        this.props = props;
        this.gameType = props?.customFields?.gameType || 'Externo';
        const { sectionId } = props?.customFields || {};

        if (sectionId && this.gameType === 'Interno') {
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
            const {
                customFields: { sectionId, subscriber, isNewGame }
            } = this.props;
            const { lnAcuSource: articleData } = this.state || {};
            const articleLink = get(
                articleData,
                'content_elements[0].website_url',
                null
            );
            const hrefLink = articleLink
                ? getHrefLink(this.gameType, sectionId, articleLink)
                : null;
            const badge = isNewGame === 'SI' ? 'NUEVO' : null;

            return { closed: subscriber, id: hrefLink || sectionId, badge };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(JuegoFeature);
