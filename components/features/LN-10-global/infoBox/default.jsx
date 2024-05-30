import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Button } from '@ln/contenidos-ui-button';
import { Link } from '@ln/common-ui-link';
import { Text } from '@ln/common-ui-text';
import getAssetsPath from '../../../private/common/utils/getAssetsPath';

export const InfoBox = ({ deployment, contextPath }) => {
    const imgData = {
        src: getAssetsPath(contextPath)(deployment)(
            'cll_web-image_infobox_mob.webp'
        ),
        alt: 'Imagen de celular con la app de Canchallena',
        sources: [
            {
                minWidth: 768,
                srcSet: getAssetsPath(contextPath)(deployment)(
                    'cll_web-image_infobox_desk.webp'
                )
            }
        ],
        className: 'w-100'
    };
    const logoData = {
        src: getAssetsPath(contextPath)(deployment)('cll-logo.webp'),
        alt: 'Logo de Canchallena'
    };
    return (
        <article className="p-16 p-24_m pb-0_m border border-all border-1 border-neutral-light-100 mb-32">
            <Link
                href="https://canchallena.lanacion.com.ar/"
                title="Ir a Canchallena"
                target="_blank"
                rel="external"
            >
                <div className="flex flex-row_m flex-column ai-center ai-stretch_m">
                    <div className="mb-0_m mb-24 mr-24_m flex-shrink-0">
                        <Adaptableimage {...imgData} />
                    </div>
                    <div className="flex flex-column gap-24 ai-start_m ai-center jc-center jc-evenly flex-shrink-1">
                        <div className="gap-16 flex flex-wrap jc-start_m jc-center">
                            <Adaptableimage {...logoData} />
                            <Text
                                as="p"
                                className="--font-primary --font-medium --font-m text-center text-initial_m text-neutral-light-800"
                            >
                                Resultados deportivos en vivo de fútbol con
                                actualización en directo, próximos partidos,
                                fixtures, estadísticas, tablas de liga y todos
                                los detalles
                            </Text>
                        </div>
                        <Button
                            title="Ir a Canchallena"
                            variant="primary"
                            onClick={() => {
                                window.open(
                                    'https://canchallena.lanacion.com.ar/',
                                    '_blank'
                                );
                            }}
                        >
                            Ir a Canchallena
                        </Button>
                    </div>
                </div>
            </Link>
        </article>
    );
};
