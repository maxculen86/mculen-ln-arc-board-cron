import { getLinkDomain } from '../../../../../../../common/utils/getEmbedHref';

const button = (nodo, dataNota) => {
    if (!nodo) return null;

    return {
        _t: 'button',
        subtype: 'linkboton',
        value: nodo.content,
        href: getLinkDomain(nodo.url)
    };
};

export default button;
