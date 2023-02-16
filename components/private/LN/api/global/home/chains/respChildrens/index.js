import get from '../../../../../../common/utils/get';
import { respChildrens as respApertura } from './elements/apertura';
import { respChildrens as respBomba } from './elements/bomba';
import { respChildrens as respManual } from './elements/tema';

const getSources = (children, storiesQuantity) => {
    return children.reduce((result, article) => {
        if (
            article &&
            (storiesQuantity === 0 || result.length < storiesQuantity)
        ) {
            return result.concat(article);
        }
        return result;
    }, []);
};

export const responseDefault = props => {
    const { children, customFields } = props;

    const layout = get(customFields, 'layout', null);
    let storiesQuantity = 0;
    if (layout) {
        storiesQuantity = parseInt(layout.charAt(layout.length - 1), 10);

        storiesQuantity = storiesQuantity || children.length;
    }
    const sources = getSources(children, storiesQuantity);

    if (!sources.length) {
        return null;
    }
    return sources;
};
export const respChildrens = {
    apertura: respApertura,
    bomba: respBomba,
    chainManual: respManual,
    dafaultResponse: responseDefault
};
