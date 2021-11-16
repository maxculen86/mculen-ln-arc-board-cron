import { getLinkDomain } from '../../../../../../../common/utils/getEmbedHref';

const button = (nodo, dataNota) => {
    if (!nodo) return null;

    const resp = {
        _t: 'button',
        subtype: 'linkboton',
        value: nodo.content,
        href: getLinkDomain(nodo.url)
    };

    return resp;
};

export default button;
