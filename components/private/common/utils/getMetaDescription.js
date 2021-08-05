import { RECETA } from './subtypes/subtypeHelper';

const getMetaDescription = (
    description,
    metaTitleBasic,
    subheadlines,
    subtype
) => {
    if (subtype === RECETA) {
        if (description && description !== '')
            return `${description} Encontrá acá la receta de ${metaTitleBasic} - LA NACION`;
        if (subheadlines && subheadlines !== '')
            return `${
                subheadlines.split('.', 1)[0]
            }. Encontrá acá la receta de ${metaTitleBasic} - LA NACION`;
        return `Encontrá acá la receta de ${metaTitleBasic} - LA NACION`;
    }
    if (description && description !== '') return `${description} - LA NACION`;
    if (subheadlines && subheadlines !== '')
        return `${subheadlines} - LA NACION`;
    return `${metaTitleBasic} - LA NACION`;
};

export default getMetaDescription;
