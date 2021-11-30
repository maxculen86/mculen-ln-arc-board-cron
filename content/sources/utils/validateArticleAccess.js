import Redirect from './redirect';

const validateArticleAccess = ({ contentCode, meteringVariant }) => {
    const PAYWALL_URL =
        'https://suscripciones.lanacion.com.ar/suscripcion/E/1/1/';

    if (contentCode === 'cerrada') {
        if (meteringVariant !== 'S') throw new Redirect(PAYWALL_URL, 301);
        return { access: true, exclusive: true };
    }

    return { access: true, exclusive: false };
};

export default validateArticleAccess;
