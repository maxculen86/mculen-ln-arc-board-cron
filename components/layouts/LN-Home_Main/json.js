import Consumer from 'fusion:consumer';
import bitacora from '../../private/LN/api/v1/bitacora';
import browser from '../../private/common/utils/browser';

//^/api/v([1]+)/home(\/.*)$
//^\/api\/v([1]+)\/home\/(.*\/)$

const LNMainHome = props => {
    const { children } = props;
    const listItems = [];
    const type = browser.getParamFrom('params', 'tipo', props.requestUri);
    let keyResult = null;
    let valueResult = null;
    switch (type) {
        case 'bitacora':
            keyResult = 'cajas';
            valueResult = bitacora(children);
            break;

        default:
            break;
    }

    listItems.push({
        [keyResult]: valueResult
    });
    return Array.isArray(listItems) ? listItems : null;
};

LNMainHome.sections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Pre-Apertura',
    'Apertura',
    'Anexo-2',
    'Breaking-1',
    'Breaking-2',
    'Breaking-3',
    'Anexo-3',
    'Opinion',
    'Breaking-4',
    'Breaking-5',
    'Comercial-1',
    'Bloque-2',
    'Comercial-2',
    'Bloque-3',
    'Bloque-4',
    'Bloque-5',
    'Bloque-6',
    'Bloque-7',
    'Bloque-8',
    'Aside'
];

export default Consumer(LNMainHome);
