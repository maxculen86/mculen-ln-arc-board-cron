import get from '../../../../../../../common/utils/get';
import {
    validateValueText,
    validateArrayNull
} from '../../../../../common/utils/validateValue';

const summary = nodo => {
    if (!nodo) return null;

    const listElements = get(nodo, 'items');
    if (!listElements || listElements.length === 0) return null;

    const resp = {
        _t: 'article_summary',
        title: 'Lo que tenés que saber',
        disclaimer:
            'Este resumen fue realizado por inteligencia artificial bajo supervisión de editores de LA NACIÓN',
        type: 'ul'
    };

    resp.items = listElements.map(bullet => {
        if (validateValueText(bullet)) return null;

        if (!bullet) return null;

        return {
            _t: 'li',
            value: bullet
        };
    });
    if (validateArrayNull(resp.items)) return null;
    return resp;
};

export default summary;
