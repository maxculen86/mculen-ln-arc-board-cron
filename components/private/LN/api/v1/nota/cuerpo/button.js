const button = buttonData => {
    if (!buttonData) return null;

    const resp = {
        _t: 'boton',
        class: 'linkboton',
        valor: buttonData.content,
        href: buttonData.url
    };

    return {
        _t: 'p',
        valor: resp
    };
};

button.type = 'interstitial_link';

export default button;
