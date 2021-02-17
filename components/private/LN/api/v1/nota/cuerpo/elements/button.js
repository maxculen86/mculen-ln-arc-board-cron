const button = (nodo, dataNota) => {
    if (!nodo) return null;

    const resp = {
        _t: 'boton',
        class: 'linkboton',
        valor: nodo.content,
        href: nodo.url
    };

    return {
        _t: 'p',
        valor: resp
    };
};

button.type = 'interstitial_link';

export default button;
