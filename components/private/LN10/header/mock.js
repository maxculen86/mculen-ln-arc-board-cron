/* eslint-disable no-console */

export const mainHeaderData = {
    initials: 'lb',
    email: 'lbarandiaran@lan...',
    desplegable: [
        {
            url: 'https://www.lanacion.com.ar/mis-notas/',
            text: 'Mis notas',
            title: 'Ir a mis notas',
            target: '_self'
        },
        {
            url: 'https://myaccount.lanacion.com.ar/mi-usuario/',
            text: 'Mi cuenta',
            title: 'Ir a mi cuenta',
            target: '_self'
        },
        {
            url: 'https://myaccount.lanacion.com.ar/datos-personales/',
            text: 'Mis datos',
            title: 'Ir a mis datos',
            target: '_self'
        },
        {
            url: 'https://micuenta.lanacion.com.ar/mis-suscripciones/',
            text: 'Mis suscripciones',
            title: 'Ir a mis suscripciones',
            target: '_self'
        },
        {
            url: '#',
            text: 'Cerrar sesión',
            title: 'Cerrar sesión',
            callback: e => {
                e.preventDefault();
                console.log('cerrar sesion');
            }
        }
    ]
};
export const subHeaderData = {
    dollar: [
        {
            text: 'Dólar oficial:',
            compra: '172,00',
            venta: '180,00',
            callback: e => {
                // e.preventDefault();
                console.log('click');
            },
            title: 'Dólar hoy',
            link: '/https://www.lanacion.com.ar/dolar-hoy/',
            id: 'precioBna'
        },
        {
            text: 'Dólar blue:',
            compra: '345,00',
            venta: '350,00',
            callback: e => {
                // e.preventDefault();
                console.log('click');
            },
            title: 'Dólar blue',
            link: 'https://www.lanacion.com.ar/tema/dolar-blue-tid67294/',
            id: 'precioBlue',
            target: '_self'
        },
        {
            text: 'CCL:',
            compra: '348,00',
            venta: '355,00',
            callback: e => {
                e.preventDefault();
                console.log('click');
            },
            title: 'Dólar contado con liquid',
            link: 'https://www.lanacion.com.ar/tema/dolar-ccl/',
            id: 'precioCCL'
        },
        {
            text: 'Dólar tarjeta:',
            compra: '348,00',
            venta: '355,00',
            callback: e => {
                e.preventDefault();
                console.log('click');
            },
            title: 'Dólar tarjeta',
            link: 'https://www.lanacion.com.ar/tema/dolar-tarjeta-tid50462/',
            id: 'precioCCL'
        }
    ],
    access: [
        {
            icon: 'bookmark',
            text: 'Mis notas',
            href: 'https://www.lanacion.com.ar/mis-notas/',
            callback: e => {
                e.preventDefault();
                console.log('click');
            }
        },
        {
            icon: 'emailOpen',
            text: 'Newsletters',
            href:
                'https://newsletter.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274',
            callback: () => {
                console.log('click');
            }
        },
        {
            icon: 'clubLnDefault',
            text: 'Club LA NACION',
            href:
                'https://club.lanacion.com.ar/?_ga=2.113114052.1174706434.1669633950-901996504.1663609274',
            callback: () => {
                console.log('click');
            }
        }
    ]
};

export const userType = 'suscribed';

// unlogged = no esta logueado (mariana)
// logged = logueado pero no suscripto (paula)
// suscribed = suscripto (ezequiel)
