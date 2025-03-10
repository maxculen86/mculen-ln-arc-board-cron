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

    return Array.from({ length: totalCustomFieldsKeys }).reduce(
        (updates, _, index) => {
            const title = customFields[`title${index}`];
            const link = customFields[`link${index}`] || '';

            if (title) {
                updates.push({ title, link });
            }

            return updates;
        },
        []
    );
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
