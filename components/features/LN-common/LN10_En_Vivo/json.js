import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import {
    A_FONDO,
    LIVEBLOG,
    LIVEBLOG_RED,
    SPONSORED,
    EXCLUSIVE_LN
} from '../../../private/common/badge/types';
import { typeBadge } from '../../LN-10/article/common/_helper-WebApi';

class EnVivo {
    constructor(props) {
        this.props = props;
        const { customFields } = this.props;
        this.state = {};
        this.notes = [];
        const sourceInclude =
            '_id,last_updated_date,headlines,canonical_website,subtype,publish_date,website_url';
        this.customFields = customFields || {};
        if (customFields) {
            const paramsNotes = [1, 2, 3, 4];
            this.notes = paramsNotes.map((e, i) => {
                if (get(customFields, 'noteId'.concat(e), null)) {
                    return {
                        orden: e,
                        noteId: get(customFields, 'noteId'.concat(e), null),
                        title: get(customFields, 'title'.concat(e), null)
                    };
                }
                return null;
            });
            let notesIds = this.notes
                .filter(x => x != null)
                .map(x => x.noteId)
                .join(',');

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
        const { acuArticlesENVIVO } = this.state || {};
        const { chapita, chapitaStyle = 2, show } = this.customFields;
        // const typeBadge = !chapitaStyle ? 2 : chapitaStyle;
        if (!acuArticlesENVIVO) {
            return null;
        }
        let resp = {};

        resp = {
            information: {
                hideCaja: show == null ? false : show,
                chapita,
                chapitaStyle: typeBadge[chapitaStyle]
            },
            articles:
                (acuArticlesENVIVO.content_elements &&
                    acuArticlesENVIVO.content_elements.map(x => {
                        return {
                            ...x,
                            additionalProperties: {
                                tipo: 'Liveblog',
                                titleVivo:
                                    this.notes &&
                                    x &&
                                    // eslint-disable-next-line no-underscore-dangle
                                    x._id &&
                                    // eslint-disable-next-line no-underscore-dangle
                                    this.notes.find(y => y.noteId === x._id)
                                        .title
                            }
                        };
                    })) ||
                []
        };

        return resp;
    }
}

export default Consumer(EnVivo);
