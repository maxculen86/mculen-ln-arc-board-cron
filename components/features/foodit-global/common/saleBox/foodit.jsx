import React, { useId } from 'react';
import { useAppContext } from 'fusion:context';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Text } from '@ln/common-ui-text';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { Image } from '@ln/common-ui-image';
import {
    mockBenefits,
    imgsIngredientsBackground,
    imgsPhoneFoodit
} from './helper';
import isSSR from '../../../../private/LN/common/utils/isSSR';

export const SaleBox = ({ ...props }) => {
    const { deployment, contextPath } = useAppContext();

    const assetsPath = file =>
        deployment(
            `${contextPath}/resources/foodit/assets/images/saleBox/${file}`
        );

    const paywallUrl = !isSSR()
        ? `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4/?cv=670&fc=826&callback=${window.btoa(
              window.location.href
          )}`
        : '';

    return (
        <section className="bg-positive relative w-100vw as-center" {...props}>
            <div className="container relative pt-56 pb-56_md pb-0_lg px-16 px-24_md px-32_lg grid grid-cols-12_md grid-cols-16_lg jc-center ai-center ai-start_md gap-24 gap-64_md">
                <div className="col-span-8 col-span-7_md col-span-9_lg flex flex-column gap-24 ai-center ai-start_md pb-56_lg">
                    <Text
                        as="h2"
                        className="prumo text-24 text-28_md text-center text-start_md"
                    >
                        <span className="roboto-bold mr-8">
                            ¡Hoy se cocina!
                        </span>
                        Disfrutá de
                        <span className="roboto-bold mx-8">Foodit</span>con
                        acceso ilimitado y saboreá el
                        <span className="roboto-bold mx-8">
                            mejor contenido gastronómico
                        </span>
                        exclusivo para suscriptores
                    </Text>
                    <div>
                        {mockBenefits.map((beneficts, i) => (
                            <div
                                key={useId()}
                                className="flex ai-center gap-4 mb-12"
                            >
                                <Icon size={20}>
                                    <IconSprite name="check" fill="#4D4D4D" />
                                </Icon>
                                <Text as="p" className="text-16">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: beneficts
                                        }}
                                    />
                                </Text>
                            </div>
                        ))}
                    </div>
                    <Button
                        title="Ir a Suscribirse"
                        variant="accent"
                        href={paywallUrl}
                    >
                        ¡suscribite hoy!
                    </Button>
                </div>
                <div className="col-span-8 col-span-5_md col-span-7_lg js-center as-end">
                    <Adaptableimage
                        className="relative z-5 h-336 h-509_md h-461_lg"
                        sources={imgsPhoneFoodit(assetsPath)}
                        src={assetsPath('phone-foodit-mobile.webp')}
                        alt="Imagen celular con la app de Foodit abierta"
                        width={251}
                    />
                </div>
            </div>
            {imgsIngredientsBackground.map(({ className, asset }) => (
                <div key={useId()} className={className}>
                    <Image
                        src={assetsPath(asset)}
                        alt="Imagen de ingredientes para el fondo"
                        loading="eager"
                    />
                </div>
            ))}
        </section>
    );
};
