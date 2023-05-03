import getElementFromRenderables from '../../../../../getElementFromRenderables';
import { isHomeLN10 } from '../../common/helper-WebApi';
import sectionsValidationLN10 from '../../../../../../../../layouts/config/LN10-Home.config.json';
import sectionsValidation from '../../../../../../../../layouts/config/LN-Home.config.json';

export const getValidElementForPreload = (layout, renderables) => {
    // TODO: Remover el return default cuando salga home ln 10
    if (isHomeLN10(layout)) {
        const bomba = getElementFromRenderables({
            position: 'Pre_Apertura.position',
            config: sectionsValidationLN10,
            typeElement: 'LN10_Caja_Bomba',
            renderables
        });

        return (
            bomba ||
            getElementFromRenderables({
                position: 'Apertura.position',
                config: sectionsValidationLN10,
                typeElement: 'LN10_Caja_Apertura',
                renderables
            }) ||
            []
        );
    }

    const bomba = getElementFromRenderables({
        position: 'Bomba.position',
        config: sectionsValidation,
        typeElement: 'LN-common/bomba',
        renderables,
        propNameHide: 'hideFeature'
    });

    return (
        bomba ||
        getElementFromRenderables({
            position: 'Apertura_1.position',
            config: sectionsValidation,
            typeElement: 'Ln_Caja_Manual',
            renderables
        }) ||
        []
    );
};
export default getValidElementForPreload;
