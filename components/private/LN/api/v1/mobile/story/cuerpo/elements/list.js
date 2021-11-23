import get from 'lodash.get';
import htmlText from '../../../../common/story/cuerpo/elements/htmlText';
import Text from './text';

const list = (nodo, dataNota) => {
    if (!nodo) return null;

    const listElements = get(nodo, 'items');
    if (!listElements || listElements.length === 0) return null;

    const type = get(nodo, 'list_type', null);
    const resp = {
        _t: type === 'unordered' ? 'ul' : 'ol'
    };

    resp.valor = listElements.map(v => {
        const valor = htmlText(v.content);
        if (valor && valor.length) {
            return {
                _t: 'li',
                valor: Text(v)
            };
        }

        return null;
    });

    return resp;
};
export default list;
