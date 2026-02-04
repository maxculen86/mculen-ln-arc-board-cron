const isRecipeSection = ({ id, path } = {}) =>
    Boolean(id?.includes('/recetas') || path?.includes('/recetas'));

export default isRecipeSection;
