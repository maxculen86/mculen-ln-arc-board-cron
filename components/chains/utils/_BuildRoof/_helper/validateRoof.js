import pageBuilderValidator from '../../../../private/common/utils/pageBuilderValidator';
import hasDataRoof from './hasDataRoof';

const validateRoof = ({
    logoData,
    linksData,
    title,
    logoId,
    hideRoof,
    navigationId,
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
        }
    ];

    return hasDataRoof({ chainStyle }) && pageBuilderValidator(rules);
};

export default validateRoof;
