import get from '../../../../../../../../common/utils/get';

// La logica actual en la bajada es que ciertas digramaciones o layouts muestran las editadas por el redactor en Pagebuilder
// Aqui se especifica la configuracion
const validateByLayoutHide = {
    bombita: [1],
    bombitaMas4: [1],
    horizontal: [1],
    vertical: [1],
    'left-focal': [1],
    'focal-70': [1],
    'center-focal': [1],
    bn_1_grid: [1],
    bn_2_1_2_grid: [1],
    bn_1_1_grid: [1],
    bn_1_2_grid: [1],
    bn_1_3_grid: [1],
    bn_1_4_grid: [1],
    cajaContent1: [1]
};

export const getDroptext = article => {
    const articlePosition = (article.index ?? -1) + 1;

    const layout = get(article, 'informationBox.layout', null);
    const hideDrop = get(
        article,
        'additionalProperties.hideDescription',
        false
    );

    const dropStory = get(article, 'subheadlines.basic', null);
    const dropEditorial = (
        get(article, 'additionalProperties.description') || ''
    ).trim();
    const dropEditorialValidate =
        dropEditorial.length > 0 ? dropEditorial : null;

    if (
        validateByLayoutHide[layout] &&
        validateByLayoutHide[layout].includes(articlePosition)
    ) {
        if (hideDrop) {
            return null;
        }
        return dropEditorialValidate || dropStory;
    }

    return null;
};

export default getDroptext;
