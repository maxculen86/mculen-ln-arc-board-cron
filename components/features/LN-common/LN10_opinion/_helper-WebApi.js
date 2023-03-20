import { setQuantityByLayout } from '../../../chains/utils/common/_helpers-WebApi';
import get from '../../../private/common/utils/get';
import pageBuilderValidator from '../../../private/common/utils/pageBuilderValidator';

export const validateFeatureOpinion = ({
    idCollectionEditorial,
    idCollectionOpinion,
    articlesOpinion,
    articlesEditorial,
    layout
}) => {
    const opinionLength = get(articlesOpinion, 'length');
    const editorialLength = get(articlesEditorial, 'length');
    const minimum = setQuantityByLayout({ layout });
    const rules = [
        {
            validation: !layout,
            message: 'Se requiere que seleccione una diagramación'
        },
        {
            validation: !idCollectionEditorial,
            message: 'Se requiere el id de la colección editorial'
        },
        {
            validation: !idCollectionOpinion,
            message: 'Se requiere el id de la colección opinion'
        },
        {
            validation: opinionLength < minimum,
            message: `Se requiere minimo ${minimum} articulos para Opinion`
        },
        {
            validation:
                idCollectionOpinion && (!articlesOpinion || !opinionLength),
            message: `La colección ${idCollectionOpinion} de opinion no encontró notas`
        },
        {
            validation:
                idCollectionOpinion && (!articlesEditorial || !editorialLength),
            message: `La colección ${idCollectionEditorial} de editorial no encontró notas`
        }
    ];
    return pageBuilderValidator(rules);
};

export default validateFeatureOpinion;
