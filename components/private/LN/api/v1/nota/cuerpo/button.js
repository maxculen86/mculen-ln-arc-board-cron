const button = buttonData => {
    if (!buttonData && !buttonData.url) return null;

    const resp = {
        _t: 'boton',
        class: 'linkboton',
        href: buttonData.url
    };

    return {
        _t: 'p',
        valor: resp
    };
};

button.type = 'interstitial_link';

export default button;
