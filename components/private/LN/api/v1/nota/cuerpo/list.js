import htmlText from './htmlText';
import get from 'lodash.get';

const list = dataList => {
    if (!dataList) return null;

    const listElements = get(dataList, 'items');
    if (!listElements || listElements.length == 0) return null;

    const resp = {
        _t: dataList.list_type === 'unordered' ? 'ul' : 'ol',
        valor: []
    };

    listElements.forEach(element => {
        if (element.content) {
            const valor = htmlText(element.content);
            if (valor && valor.length) {
                resp.valor.push({
                    _t: 'li',
                    valor: valor
                });
            }
        }
    });

    return {
        _t: 'p',
        valor: resp
    };
};

list.type = 'list';

export default list;
