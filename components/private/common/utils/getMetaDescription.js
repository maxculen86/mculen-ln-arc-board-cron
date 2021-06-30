import { RECETA } from './subtypes/subtypeHelper';

const getMetaDescription = (
    description,
    firstParagraphContentElements,
    metaTitleBasic,
    subheadlines,
    subtype
) => {
    if (subtype === RECETA) {
        if (description && description !== '')
            return `${
                description.split('.', 1)[0]
            } encontrá acá la receta de ${metaTitleBasic}`;
    }
    if (description && description !== '') return description;
    if (subheadlines && subheadlines !== '') return subheadlines;
    if (firstParagraphContentElements && firstParagraphContentElements !== '')
        return firstParagraphContentElements;
    return metaTitleBasic;
};

export default getMetaDescription;
