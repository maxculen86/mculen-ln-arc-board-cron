import get from '../../../../../../../common/utils/get';
import htmlText from './htmlText';
import { removeEmptyItems } from '../../../../common/utils/responseCleaner';

const list = (nodo, dataNota) => {
    if (!nodo) return null;

    const listElements = get(nodo, 'items');
    if (!listElements || listElements.length === 0) return null;

    const resp = removeEmptyItems(
        listElements.map(v => {
            return htmlText(v.content);
        })
    );
    return resp.length === 0 ? null : resp.join('\n');
};
export default list;
