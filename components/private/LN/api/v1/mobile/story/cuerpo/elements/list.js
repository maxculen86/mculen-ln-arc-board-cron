import get from 'lodash.get';
import htmlText from '../../../../common/story/cuerpo/elements/htmlText';
import Text from './text';
import validateValueText from '../../../../common/utils/validateValueText';

const list = (nodo, dataNota) => {
    if (!nodo) return null;

    const listElements = get(nodo, 'items');
    if (!listElements || listElements.length === 0) return null;

    const type = get(nodo, 'list_type', null);
    const resp = {
        _t: 'list',
        type: type === 'unordered' ? 'ul' : 'ol'
    };

    resp.value = listElements.map(v => {
        const value = htmlText(v.content);
        if (!validateValueText(value)) return null;
        if (value && value.length) {
            return {
                _t: 'li',
                value: Text(v)
            };
        }

        return null;
    });
    return resp;
};
export default list;
