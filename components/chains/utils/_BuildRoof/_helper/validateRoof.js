import pageBuilderValidator from '../../../../private/common/utils/pageBuilderValidator';
import { CHAIN_STYLE } from '../../_helpers';

const { HASHTAG } = CHAIN_STYLE;
const validateRoof = ({
    logoData,
    linksData,
    title,
    logoId,
    hideRoof,
    navigationId,
    linkButton,
    buttonText,
    chainStyle
}) => {
    const rules = [
        {
            validation: logoId && !logoData,
            message: `El ID de la imagen del logo es incorrecto.`
        },
        {
            validation: !hideRoof && !title,
            message: 'Debe definir un titulo para el techo.'
        },
        {
            validation: navigationId && !linksData,
            message: 'El ID de navegacion de site services es incorrecto.'
        },
        {
            validation: buttonText && buttonText.trim() && !linkButton,
            message: 'Debe definir una url para el boton'
        }
    ];

    return chainStyle !== HASHTAG && pageBuilderValidator(rules);
};

export default validateRoof;
