import pageBuilderValidator from '../../../../private/common/utils/pageBuilderValidator';

const validateRoof = ({
    logoData,
    linksData,
    title,
    logoId,
    hideRoof,
    navigationId,
    linkButton,
    buttonText
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

    return pageBuilderValidator(rules);
};

export default validateRoof;
