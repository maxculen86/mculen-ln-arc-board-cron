// TODO: Este archivo se debe eliminar.
// Se deja repo funcionando para pasar la logica al feature infoBox de LN-nota.
// Se dejan en el repo las imagenes correspondientes para el zocalo de juegos.
import React from 'react';
import { Zocalo } from '@ln/contenidos-ui-zocalo';
import getAssetsPath from '../../../private/common/utils/getAssetsPath';

export const InfoBox = ({ deployment, contextPath }) => {
    const imgData = {
        src: getAssetsPath(contextPath)(deployment)(
            'cll_web-image_infobox_mob.webp',
        ),
        alt: 'Imagen de celular con la app de Canchallena',
        sources: [
            {
                minWidth: 768,
                srcSet: getAssetsPath(contextPath)(deployment)(
                    'cll_web-image_infobox_desk.webp',
                ),
            },
        ],
        className: 'w-100',
    };
    const logoData = {
        src: getAssetsPath(contextPath)(deployment)('cll-logo.webp'),
        alt: 'Logo de Canchallena',
    };
    const linksData = {
        href: 'https://canchallena.lanacion.com.ar/',
        title: 'Ir a Canchallena',
        target: '_blank',
        rel: undefined,
    };

    const buttonData = {
        href: 'https://canchallena.lanacion.com.ar/',
        title: 'Ir a Canchallena',
        label: 'Ir a Canchallena',
    };

    const description =
        'Encontrá resultados de fútbol en vivo, los próximos partidos, las tablas de posiciones, y todas las estadísticas de los principales torneos del mundo';

    return (
        <Zocalo
            linkProps={linksData}
            imgProps={imgData}
            buttonProps={buttonData}
            logoProps={logoData}
            description={description}
        />
    );
};
