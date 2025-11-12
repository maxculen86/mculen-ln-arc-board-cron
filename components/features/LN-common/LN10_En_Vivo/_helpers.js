import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import liveFilter from '../../../../content/filters/LN/home/liveFilter';
import get from '../../../private/common/utils/get';
import getTitleText from '../../../private/common/utils/getTitleText';

export const getFieldsFromNotes = index => ({
    [`noteId${index}`]: PropTypes.string.tag({
        name: 'ID de nota',
        description: 'Ingrese aquí el id de la nota',
        defaultValue: '',
        group: `Vivo ${index}`
    }),
    [`title${index}`]: PropTypes.string.tag({
        name: 'Título',
        description: 'Ingrese el texto del título.',
        defaultValue: '',
        group: `Vivo ${index}`
    })
});

export const findError = (articles = []) => {
    const articleWithError = articles.find(({ error = false } = {}) => error);
    return (
        articleWithError && {
            type: 'warning',
            message: `El ID de la nota ${articleWithError.group} (ID: ${articleWithError.id}) es incorrecto`
        }
    );
};
export const getCustomFieldNameAndGroup = string => {
    const [, customFieldName, group] =
        (typeof string === 'string' && string.match(/(.*)(\d)/)) || [];
    return { customFieldName, group };
};

export const getListOfNoteFields = (listCustomFields = []) =>
    listCustomFields.reduce((acc, [key, value] = []) => {
        const { customFieldName, group } = getCustomFieldNameAndGroup(key);
        if (group) {
            const index = parseInt(group, 10) - 1;
            acc[index] = { ...acc[index], [customFieldName]: value, group };
        }
        return acc;
    }, []);

export const validateId = id => id && id.trim();

export const convertMillisecondsToMinutes = miliseconds => {
    const minutes = miliseconds / 1000 / 60;

    return miliseconds && Math.abs(Math.round(minutes));
};

export const calculateTimePublish = (noteDate, currentDate) => {
    const publishDate = new Date(noteDate);
    const diference = currentDate.getTime() - publishDate.getTime();
    const minutes = convertMillisecondsToMinutes(diference);

    return minutes < 45 && `Hace ${minutes} min`;
};

export const getArticle = ({ group = 1, noteId = '', customTitle = '' }) => {
    const id = validateId(noteId);
    const article = useContent({
        source: id ? 'lnHomeBaseArticleSource' : null,
        query: {
            id,
            published: true
        },
        staticMode: true,
        filter: liveFilter
    });

    const headlines = get(article, 'headlines', {});
    const publishDate = get(article, 'last_updated_date', '');
    const currentDate = new Date();

    return {
        id: noteId,
        title: !customTitle ? getTitleText(headlines) : customTitle,
        url: get(article, 'canonical_url', ''),
        timeSinceUpdate: calculateTimePublish(publishDate, currentDate),
        error: noteId && !article,
        group
    };
};

export const getNotesLists = (listCustomFields = []) => {
    const fields = getListOfNoteFields(listCustomFields);

    return fields.map(field => {
        const noteId = get(field, 'noteId', '');
        const customTitle = get(field, 'title', '');
        const group = get(field, 'group', 1);

        return getArticle({ group, noteId, customTitle });
    });
};

export const getTopicsFromCustomFields = (customFields = {}) => {
    const totalCustomFieldsKeys = Object.keys(customFields).length;
    const topicKeys = Array.from(
        { length: totalCustomFieldsKeys },
        (_, index) => index
    );

    return topicKeys
        .map(key => ({
            title: customFields[`title ${key}`],
            link: customFields[`link ${key}`],
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN'
        }))
        .filter(topic => topic.title && topic.link);
};

export const setTopicsCustomFields = (maxTopics = 5) => {
    const iterator = Array.from({ length: maxTopics }, (_, index) => index);

    return iterator.reduce((customFields, next) => {
        const group = `Tema ${next + 1}`;

        return {
            ...customFields,
            [`title ${next}`]: PropTypes.string.isRequired.tag({
                label: 'Título',
                group
            }),
            [`link ${next}`]: PropTypes.string.isRequired.tag({
                label: 'Link',
                group
            })
        };
    }, {});
};
