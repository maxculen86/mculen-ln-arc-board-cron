const isRecipeSection = section =>
    Boolean(
        section &&
            ((section.id && section.id.includes('/recetas')) ||
                (section.path && section.path.includes('/recetas')))
    );

export default isRecipeSection;
