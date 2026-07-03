import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import get from '../../../../private/common/utils/get';

const addActionToDataLayer = (article, action) => {
    const TYPES_LABEL = {
        7: 'receta',
        4: 'nota'
    };

    addEventToDataLayerV2({
        event: 'e_linkclick',
        category: 'interaction',
        label: TYPES_LABEL[get(article, 'subtype', '')] || '',
        action,
        title: get(article, 'headlines.basic', ''),
        articleId: get(article, '_id', '')
    });
};

export default addActionToDataLayer;
