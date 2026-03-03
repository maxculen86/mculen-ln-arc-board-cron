import { LOGIN_URL, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';

export default {
    title: 'Para realizar esta acción adquirí una suscripción',
    button: {
        label: 'suscribirme',
        style: '--tertiary',
        href: `${SITIO_SEGURO_REGISTRACION}/ln/suscribirme?cv=670&fc=744&callback=`
    },
    unLogged: {
        text: '¿Ya sos suscriptor?',
        textLink: 'Iniciar sesión',
        href: LOGIN_URL
    },
    logged: {
        text: '¿Tenés Club LA NACION Black o Premium?',
        textLink: 'Vincular credencial',
        href: 'https://checkout.lanacion.com.ar/suscripcion/C/111/?cv=670&fc=744&productCategory=Voluntario&callback='
    }
};
