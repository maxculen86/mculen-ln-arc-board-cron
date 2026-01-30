import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import { typeBadge } from '../../LN-10/article/common/_helper-WebApi';

class EnVivo {
    constructor(props) {
        this.props = props;
        const { customFields } = this.props;
        this.state = {};
        this.notes = [];
        const sourceInclude =
            '_id,last_updated_date,headlines,canonical_website,subtype,publish_date,website_url,label.republicar_audio,source.system';
        this.customFields = customFields || {};
        if (customFields) {
            const paramsNotes = [1, 2, 3, 4];
            this.notes = paramsNotes.map(e => {
                if (get(customFields, 'noteId'.concat(e), null)) {
                    return {
                        orden: e,
                        noteId: (
                            get(customFields, 'noteId'.concat(e), null) || ''
                        ).trim(),
                        title: get(customFields, 'title'.concat(e), null)
                    };
                }
                return null;
            });
            let notesIds = this.notes
                .filter(x => x != null)
                .map(x => x.noteId)
                .join(',');

            const regex = /,,/g;
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
        const { show } = this.customFields;
        if (!acuArticlesENVIVO) {
            return null;
        }
        let resp = {};
        const chapitaStyle = get(this.customFields, 'chapitaStyle', 2) || 2;

        resp = {
            information: {
                hideCaja: show == null ? false : show,
                chapita: 'TEST - JSON VERSION 4',
                chapitaStyle: typeBadge[chapitaStyle]
            },
            articles:
                (acuArticlesENVIVO.content_elements &&
                    acuArticlesENVIVO.content_elements.map(x => {
                        const note =
                            this.notes.find(
                                y => get(y, 'noteId', null) === get(x, '_id')
                            ) || {};
                        return {
                            ...x,
                            additionalProperties: {
                                variant: 'liveblogEnVivo',
                                title:
                                    this.notes &&
                                    x &&
                                    // eslint-disable-next-line no-underscore-dangle
                                    x._id &&
                                    // eslint-disable-next-line no-underscore-dangle
                                    note.title
                            }
                        };
                    })) ||
                []
        };
        return resp;
    }
}

export default Consumer(EnVivo);
