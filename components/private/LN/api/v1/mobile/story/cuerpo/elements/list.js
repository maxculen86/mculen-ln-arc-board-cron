import get from 'lodash.get';
import htmlText from '../../../../common/story/cuerpo/elements/htmlText';
import {
    validateValueText,
    validateArrayNull
} from '../../../../common/utils/validateValue';

const list = (nodo, dataNota) => {
    if (!nodo) return null;

    const listElements = get(nodo, 'items');
    if (!listElements || listElements.length === 0) return null;

    const type = get(nodo, 'list_type', null);
    const resp = {
        _t: 'list',
        type: type === 'unordered' ? 'ul' : 'ol'
    };

    resp.items = listElements.map(v => {
        if (validateValueText(v.content)) return null;
        const value = htmlText(v.content);
        if (value && value.length) {
            return {
                _t: 'li',
                value: v.content
            };
        }

        return null;
    });
    if (validateArrayNull(resp.items)) return null;
    return resp;
};
export default list;
