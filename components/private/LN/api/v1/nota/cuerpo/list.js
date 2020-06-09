import htmlText from './htmlText';
import get from 'lodash.get';

const list = data => {
    const listElements = get(data, 'items');
    if (!listElements && !listElements.length) return null;

    const resp = {
        _t: data.list_type === 'unordered' ? 'ul' : 'ol',
        valor: []
    };

    listElements.forEach(element => {
        const valor = htmlText(element.content);
        if (valor) {
            resp.valor.push({
                _t: 'li',
                valor: valor
            });
        }
    });

    return {
        _t: 'p',
        valor: resp
    };
};

list.type = 'list';

export default list;
