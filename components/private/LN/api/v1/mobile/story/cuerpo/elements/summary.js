import get from '../../../../../../../common/utils/get';
import htmlText from '../../../../../common/elements/story/cuerpo/elements/htmlText';
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
        title: 'RESUMEN DE NOTA',
        disclaimer: 'Resumen generada por inteligencia artificial',
        type: 'ul'
    };

    resp.items = listElements.map(bullet => {
        if (validateValueText(bullet)) return null;
        const value = htmlText(bullet);
        if (value) {
            return {
                _t: 'li',
                value: bullet
            };
        }

        return null;
    });
    if (validateArrayNull(resp.items)) return null;
    return resp;
};

export default summary;
