import React from 'react';
import { SITE_LANACION, API_ENV } from 'fusion:environment';
import ComLinkList from '../../../private/common/com-link-list';
import { meanings } from '../../../../content/sources/utils/servicesSource/lottery/_config';

const LotteryDetailNav = () => {
    const list = tagList.map(tag => ({
        title: tag.linkTitle || `Ir a ${tag.title}`,
        link: `${SITE_LANACION}${tag.link}`,
        textname: tag.title
    }));
    return <ComLinkList list={list} extraClass="--tags" />;
};

LotteryDetailNav.label = 'LN Loteria Detalle Navegación';

export default LotteryDetailNav;

const tagList = [
    {
        title: 'Quiniela Nacional',
        link: '/loterias/quiniela-nacional/'
    },
    {
        title: 'Quiniela de la Provincia',
        link: '/loterias/quiniela-provincia/'
    },
    {
        title: 'Quiniela de Córdoba',
        link: '/loterias/quiniela-cordoba/'
    },
    {
        title: 'Quiniela de Santa Fe',
        link: '/loterias/quiniela-santa-fe/'
    },
    {
        title: 'Quiniela de Montevideo',
        link: '/loterias/quiniela-montevideo/'
    },
    {
        title: 'Quini 6',
        link: '/loterias/quini-6/'
    },
    {
        title: 'Telekino',
        link: '/loterias/telekino/'
    },
    {
        title: 'Loto Plus',
        link: '/loterias/loto/'
    },
    {
        title: 'Loto 5',
        link: '/loterias/loto-5/'
    },
    {
        title: 'Quiniela Poceada',
        link: '/loterias/quiniela-poceada/'
    },
    {
        title: 'Quiniela Plus',
        link: '/loterias/quiniela-plus/'
    },
    {
        title: 'Brinco',
        link: '/loterias/brinco/'
    },
    {
        title: `Sueños: ${meanings.Tradicional.title}`,
        link: meanings.Tradicional.link[API_ENV],
        linkTitle: meanings.Tradicional.linkTitle
    },
    {
        title: `Sueños: ${meanings.Nombres.title}`,
        link: meanings.Nombres.link[API_ENV],
        linkTitle: meanings.Nombres.linkTitle
    },
    {
        title: `Sueños: ${meanings.Animales.title}`,
        link: meanings.Animales.link[API_ENV],
        linkTitle: meanings.Animales.linkTitle
    },
    {
        title: `Sueños: ${meanings.LoteriaNacional.title}`,
        link: meanings.LoteriaNacional.link[API_ENV],
        linkTitle: meanings.LoteriaNacional.linkTitle
    }
];
