import PropTypes from 'fusion:prop-types';

export const getFieldsFromNotes = index => ({
    [`noteId${index}`]: PropTypes.string.tag({
        name: 'ID de nota',
        description: 'Ingrese aquí el id deula nota',
        defaultValue: '',
        group: `Nota ${index}`
    }),
    [`title${index}`]: PropTypes.string.tag({
        name: 'Título',
        description: 'Ingrese el texto del título.',
        defaultValue: '',
        group: `Nota ${index}`
    })
});

const getKeyAndGroup = string => {
    const [, key, group] =
        (typeof string === 'string' && string.match(/(.*)(\d)/)) || [];
    return { key, group };
};

export const getListOfTitlesAndIds = (listCustomFileds = []) => {
    return listCustomFileds.reduce((acc, [key, value] = []) => {
        const { key: keyName, group } = getKeyAndGroup(key);
        if (group) {
            const index = group - 1;
            acc[index] = { ...acc[index], [keyName]: value };
        }
        return acc;
    }, []);
};

export const validateId = id => id && id.trim();

export const calculateTimePublish = publishDate => {
    const today = new Date();
    const fechaPublicacion = new Date(publishDate);
    // TODO: Hay que formatear la fecha a la de EU
    const diference = (today.getTime() - fechaPublicacion.getTime()) / 1000;
    return getPostTime(diference);
};

export const getPostTime = minutes => {
    return minutes < 45 && `Hace ${minutes} min`;
};
