import React from 'react';
import ComLinkList from '../../../private/common/com-link-list';

const LotteryDetailNav = () => {
    return <ComLinkList list={tagList} extraClass="--tags" />;
};

LotteryDetailNav.label = 'LN Loteria Detalle Navegación';

export default LotteryDetailNav;

const tagList = [
    {
        title: 'Quiniela de la Ciudad',
        link: 'https://www.lanacion.com.ar/loterias/quiniela-nacional/',
        textname: 'Quiniela de la Ciudad'
    },
    {
        title: 'Quiniela de la Provincia',
        link: 'https://www.lanacion.com.ar/loterias/quiniela-provincia/',
        textname: 'Quiniela de la Provincia'
    },
    {
        title: 'Quiniela de Córdoba',
        link: 'https://www.lanacion.com.ar/loterias/quiniela-cordoba/',
        textname: 'Quiniela de Córdoba'
    },
    {
        title: 'Quiniela de Santa Fé',
        link: 'https://www.lanacion.com.ar/loterias/quiniela-santa-fe/',
        textname: 'Quiniela de Santa Fé'
    },
    {
        title: 'Quiniela de Montevideo',
        link: 'https://www.lanacion.com.ar/loterias/quiniela-montevideo/',
        textname: 'Quiniela de Montevideo'
    },
    {
        title: 'Quini 6',
        link: 'https://www.lanacion.com.ar/loterias/quini-6/',
        textname: 'Quini 6'
    },
    {
        title: 'Telekino',
        link: 'https://www.lanacion.com.ar/loterias/telekino/',
        textname: 'Telekino'
    },
    {
        title: 'Loto Plus',
        link: 'https://www.lanacion.com.ar/loterias/loto/',
        textname: 'Loto Plus'
    },
    {
        title: 'Loto 5',
        link: 'https://www.lanacion.com.ar/loterias/loto-5/',
        textname: 'Loto 5'
    },
    {
        title: 'Quiniela Poceada',
        link: 'https://www.lanacion.com.ar/loterias/quiniela-poceada/',
        textname: 'Quiniela Poceada'
    },
    {
        title: 'Quiniela Plus',
        link: 'https://www.lanacion.com.ar/loterias/quiniela-plus/',
        textname: 'Quiniela Plus'
    },
    {
        title: 'Brinco',
        link: 'https://www.lanacion.com.ar/loterias/brinco/',
        textname: 'Brinco'
    },
    {
        title: 'Tradicional',
        link:
            'https://www.lanacion.com.ar/loterias/significado-de-los-numeros-tradicional-nidNNNNNN/',
        textname: 'Tradicional'
    },
    {
        title: 'Nombres',
        link:
            'https://www.lanacion.com.ar/loterias/significado-de-los-numeros-nombres-nidNNNNNN/',
        textname: 'Nombres'
    },
    {
        title: 'Animales',
        link:
            'https://www.lanacion.com.ar/loterias/significado-de-los-numeros-animales-nidNNNNNN/',
        textname: 'Animales'
    },
    {
        title: 'Loteria Nacional',
        link:
            'https://www.lanacion.com.ar/loterias/significado-de-los-numeros-loteria-nacional-nidNNNNNN/',
        textname: 'Loteria Nacional'
    }
];
