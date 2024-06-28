import get from './get';
import transformISODate from './transformISODate';
import { isEmptyString } from './dataValidation';

const getMetaDescription = (
    description,
    metaTitleBasic,
    subheadlines,
    subtype,
    displayDate
) => {
    const noteOptions = {
        '5': () => {
            return !isEmptyString(subheadlines)
                ? `${subheadlines} - LA NACION`
                : `Video de ${metaTitleBasic} - ${transformISODate(
                      displayDate
                  )} - LA NACION`;
        },
        '7': () => {
            if (!isEmptyString(description))
                return `${description} Encontrá acá la receta de ${metaTitleBasic} - LA NACION`;

            if (!isEmptyString(subheadlines))
                return `${
                    subheadlines.split('.', 1)[0]
                }. Encontrá acá la receta de ${metaTitleBasic} - LA NACION`;

            return `Encontrá acá la receta de ${metaTitleBasic} - LA NACION`;
        },
        default: () => {
            if (description && description !== '')
                return `${description} - LA NACION`;

            if (!isEmptyString(subheadlines))
                return `${subheadlines} - LA NACION`;

            return `${metaTitleBasic} - LA NACION`;
        }
    };
    return get(noteOptions, subtype, noteOptions.default)();
};

export default getMetaDescription;
