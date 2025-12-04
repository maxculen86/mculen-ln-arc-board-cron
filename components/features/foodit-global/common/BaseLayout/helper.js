export const getMainPaddingClass = (layout, layoutsName) => {
    const mainPadding = 'pt-185 pt-193_md pt-174_lg';
    const notePadding = 'pt-170 pt-130_lg';

    const PADDING_BY_LAYOUT = {
        [layoutsName.FooditHome]: mainPadding,
        [layoutsName.FooditFichaReceta]: mainPadding,
        [layoutsName.FooditRecipePaywall]: mainPadding,
        [layoutsName.Foodit404]: mainPadding,
        [layoutsName.FooditFichaNota]: notePadding,
        [layoutsName.FooditNotePaywall]: notePadding,
        [layoutsName.FooditBuscador]: 'pt-170'
    };

    const DEFAULT_PADDING = 'pt-213 pt-174_lg';

    return PADDING_BY_LAYOUT[layout] ?? DEFAULT_PADDING;
};
