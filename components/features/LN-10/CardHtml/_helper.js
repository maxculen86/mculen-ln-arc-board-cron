import get from '../../../private/common/utils/get';
import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

const validateSpaceBlank = (customFields, field) =>
    !get(customFields, `${field}`, '').trim();

const validateHtmlFeature = ({ customFields }) => {
    const { heightMobile, heightTablet, heightDesktop } = customFields || {};
    const rules = [
        {
            validation: validateSpaceBlank(customFields, 'html'),
            message: 'El campo "Tablero / HTML" es obligatorio'
        },
        {
            validation: validateSpaceBlank(customFields, 'title'),
            message: 'Debe proporcionar un título para el artículo.'
        },
        {
            validation: !heightMobile || !heightTablet || !heightDesktop,
            message: 'Debe definir altos para todos los dispositivos.'
        }
    ];

    return pageBuilderValidator(rules);
};

export default validateHtmlFeature;
