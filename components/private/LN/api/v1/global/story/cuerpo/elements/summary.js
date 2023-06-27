import get from '../../../../../../../common/utils/get';
import { validateArrayNull } from '../../../../../common/utils/validateValue';

const list = (nodo, dataNota) => {
    if (!nodo) return null;

    const listElements = get(nodo, 'items');
    if (!listElements || listElements.length === 0) return null;

    const resp = {
        _t: 'article_summary',
        title: 'RESUMEN DE NOTA',
        disclaimer: 'Resumen generada por inteligencia artificial',
        type: 'ul'
    };

    resp.valor = listElements.map(bullet => {
        if (!bullet) return null;

        return {
            _t: 'li',
            valor: bullet
        };
    });

    if (validateArrayNull(resp.valor)) return null;

    return {
        _t: 'p',
        valor: resp
    };
};
export default list;
