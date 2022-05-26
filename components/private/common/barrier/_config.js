import { LOGIN_URL, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';

const CONFIG = {
    'delete-note': {
        className: '--delete-note',
        title: '<strong>Borrar nota guardada</strong>',
        subTitle: 'La nota se eliminará del listado.',
        buttons: {
            cancel: {
                label: 'cancelar',
                style: '--secondary'
            },
            confirm: {
                label: 'confimar',
                style: '--primary'
            }
        }
    },
    'exclusive-ln': {
        className: '--exclusive-ln',
        title:
            'Para realizar esta acción adquirí una <strong> suscripción.</strong>',
        buttons: {
            label: 'suscribirme',
            style: '--tertiary',
            link: `${SITIO_SEGURO_REGISTRACION}/suscribirme?cv=670&fc=744&callback=`
        },
        unLogged: {
            text: '¿Ya sos suscriptor?',
            textLink: 'Iniciar Sesion',
            href: LOGIN_URL
        },
        logged: {
            text: '¿Tenés Club LA NACION Black o Premium?',
            textLink: 'Vincular credencial',
            href:
                'https://checkout.lanacion.com.ar/suscripcion/C/111/?cv=670&fc=744&productCategory=Voluntario&callback='
        }
    }
};

export default CONFIG;
