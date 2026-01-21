export const getHeaderValidations = ({
    layout = '',
    section = '',
    layoutsName = {}
}) => {
    const validationBy = [section, layout];

    // Agregar layouts para position default y dark-theme.
    return {
        shouldBePositionDefault: validationBy.some(validation =>
            [layoutsName.NotaOpinion].includes(validation)
        ),
        shouldBeDarkTheme: validationBy.some(validation =>
            [layoutsName.Video].includes(validation)
        )
    };
};
