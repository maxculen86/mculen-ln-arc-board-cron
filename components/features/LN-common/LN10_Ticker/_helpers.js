import PropTypes from 'fusion:prop-types';

export const setWarning = ({ hideFeature, updates = [] }) =>
    !hideFeature && updates.length === 0
        ? {
              type: 'warning',
              message:
                  'Introduzca al menos un título de novedad con su respectivo enlace'
          }
        : {};

export const getUpdatesFromCustomFields = (customFields = {}) => {
    const totalCustomFieldsKeys = Object.keys(customFields).length;
    const updatesKeys = Array.from(
        { length: totalCustomFieldsKeys },
        (_, index) => index
    );

    return updatesKeys
        .map(key => ({
            title: customFields[`title${key}`],
            link: customFields[`link${key}`]
        }))
        .filter(update => update.title && update.link);
};

export const setUpdatesCustomFields = (maxTopics = 3) => {
    const iterator = Array.from({ length: maxTopics }, (_, index) => index);

    return iterator.reduce((customFields, next) => {
        const group = `Novedad ${next + 1}`;

        return {
            ...customFields,
            [`title${next}`]: PropTypes.string.isRequired.tag({
                label: 'Título',
                group
            }),
            [`link${next}`]: PropTypes.string.tag({
                label: 'Link',
                group
            })
        };
    }, {});
};
