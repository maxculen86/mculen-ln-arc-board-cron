import getElementFromRenderables from '../../../../../getElementFromRenderables';
import { isHomeLN10 } from '../../common/helper-WebApi';
import sectionsValidationLN10 from '../../../../../../../../layouts/config/LN10-Home.config.json';

export const getValidElementForPreload = (layout, renderables) => {
    if (!isHomeLN10(layout)) {
        return [];
    }

    const bomba = getElementFromRenderables({
        position: 'Pre_Apertura.position',
        config: sectionsValidationLN10,
        typeElement: 'LN10_Caja_Bomba',
        renderables
    });

    if (bomba) {
        return bomba;
    }

    return (
        getElementFromRenderables({
            position: 'Apertura.position',
            config: sectionsValidationLN10,
            typeElement: 'LN10_Caja_Apertura',
            renderables
        }) || []
    );
};

export default getValidElementForPreload;
