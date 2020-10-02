import get from 'lodash.get';
import htmlText from './htmlText';

const list = dataList => {
    if (!dataList) return null;

    const listElements = get(dataList, 'items');
    if (!listElements || listElements.length === 0) return null;

    const type = get(dataList, 'list_type', null);
    const resp = {
        _t: type === 'unordered' ? 'ul' : 'ol'
    };

    resp.valor = listElements.map(v => {
        const valor = htmlText(v.content);
        if (valor && valor.length) {
            return {
                _t: 'li',
                valor
            };
        }

        return null;
    });

    return {
        _t: 'p',
        valor: resp
    };
};

list.type = 'list';

export default list;
