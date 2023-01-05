import Consumer from 'fusion:consumer';
import {
    A_FONDO,
    LIVEBLOG,
    LIVEBLOG_RED,
    SPONSORED,
    EXCLUSIVE_LN
} from '../../../private/common/badge/types';

class EnVivo {
    constructor(props) {
        this.props = props;
        const { customFields } = this.props;
        this.state = {};
        const sourceInclude =
            '_id,last_updated_date,headlines,canonical_website,subtype,publish_date,website_url';
        this.customFields = customFields || {};
        if (customFields) {
            let notesIds = [
                `${
                    customFields.noteId1 && customFields.noteId1 !== ''
                        ? `${customFields.noteId1},`
                        : ''
                }`,
                `${
                    customFields.noteId2 && customFields.noteId2 !== ''
                        ? `${customFields.noteId2},`
                        : ''
                }`,
                `${
                    customFields.noteId3 && customFields.noteId3 !== ''
                        ? `${customFields.noteId3},`
                        : ''
                }`,
                `${
                    customFields.noteId4 && customFields.noteId4 !== ''
                        ? `${customFields.noteId4}`
                        : ''
                }`
            ].join('');
            const regex = new RegExp(`/,,/`);
            notesIds = notesIds.replace(regex, ',');

            this.fetchContent({
                acuArticlesENVIVO: {
                    source: 'acuArticlesSourcebyIds',
                    query: {
                        Ids: notesIds,
                        sizeMax: 5,
                        sourceInclude
                    }
                }
            });
        }
    }

    render() {
        const styles = {
            0: A_FONDO,
            1: LIVEBLOG,
            2: LIVEBLOG_RED,
            3: SPONSORED,
            4: EXCLUSIVE_LN
        };

        const { acuArticlesENVIVO } = this.state || {};
        const { chapita, chapitaStyle } = this.customFields;
        const typeBadge = !chapitaStyle ? 2 : chapitaStyle;
        if (!acuArticlesENVIVO) {
            return null;
        }
        let resp = {};

        resp = {
            information: {
                hideCaja: false,
                chapita,
                chapitaStyle: styles[typeBadge]
            },
            articles:
                (acuArticlesENVIVO.content_elements &&
                    acuArticlesENVIVO.content_elements.map(x => {
                        return x;
                    })) ||
                []
        };

        return resp;
    }
}

export default Consumer(EnVivo);
