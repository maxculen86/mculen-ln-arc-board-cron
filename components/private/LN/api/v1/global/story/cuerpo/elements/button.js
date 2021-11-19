import { getLinkDomain } from '../../../../../../../common/utils/getEmbedHref';

const button = (nodo, dataNota) => {
    if (!nodo) return null;

    const resp = {
        _t: 'boton',
        class: 'linkboton',
        valor: nodo.content,
        href: getLinkDomain(nodo.url)
    };

    return {
        _t: 'p',
        valor: resp
    };
};
export default button;
