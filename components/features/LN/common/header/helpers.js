export const getHeaderValidations = ({
    layout = '',
    section = '',
    layoutsName = {}
}) => {
    const validationBy = [section, layout];

    // Agregar layouts para position default y dark-theme.
    return {
        shouldBePositionDefault: validationBy.some(validation =>
            [layoutsName.HomeLN10].includes(validation)
        ),
        shouldBeDarkTheme: validationBy.some(validation =>
            [layoutsName.Video, layoutsName.StoryTellingV2].includes(validation)
        )
    };
};
