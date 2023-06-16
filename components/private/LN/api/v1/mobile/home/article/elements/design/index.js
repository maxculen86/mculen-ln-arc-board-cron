import get from '../../../../../../../../common/utils/get';
import diagramations from '../../../../../../../../../layouts/config/api-diagramations/LN10-Home_Main.json';

export const getDesign = article => {
    const typeSeccion = get(article, 'informationBox.sectionAliasMobile', null);
    const design = get(article, 'additionalProperties.diseno', null);
    const variant =
        get(article, 'additionalProperties.variant', 'regular') || 'regular';

    if (
        !design &&
        article &&
        article.index > -1 &&
        article.informationBox &&
        article.informationBox.layout
    ) {
        const nameIndexforDiagrmation = 'T'.concat(
            (article.index + 1).toString()
        );
        const diagramation =
            diagramations[typeSeccion] ||
            diagramations[article.informationBox.layout];

        const configDiagramationBoxByVariant =
            diagramation &&
            diagramation.find(f => {
                return f && f.variants && f.variants.includes(variant);
            });
        if (
            configDiagramationBoxByVariant &&
            configDiagramationBoxByVariant[nameIndexforDiagrmation]
        ) {
            return configDiagramationBoxByVariant[nameIndexforDiagrmation];
        }
    }
    return design;
};

export default getDesign;
