import React from 'react';
import Static from 'fusion:static';
import {
    FOODIT_LOGIN_URL,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';

import { Button } from '@ln/foodit-ui-button';
import { Text } from '@ln/common-ui-text';
import useGetUserConfig from '../../hooks/useGetUserConfig';

import addEventToDataLayer from '../../../../private/LN/common/utils/addEventToDataLayer';

function SingWall() {
    const { userType = 'loading', promotions } = useGetUserConfig();
    const { buttonSubscribeText } = promotions;

    return (
        <section className="bg-neutral-light-100 relative w-100vw as-center shadow-top">
            <div className="container py-16 py-24_md py-32_lg text-center grid grid-cols-12_md">
                <Static htmlOnly persistent id="signwall-content">
                    <div className="flex flex-column gap-12 col-span-8 col-span-12_md">
                        <Text
                            as="h2"
                            className="prumo prumo-semibold text-light-800 text-28 text-36_md text-40_lg"
                        >
                            Suscribite para ver todas las recetas de forma
                            ilimitada.
                            <span className="block">$500/mes por 6 meses</span>
                        </Text>
                        <Text
                            as="p"
                            className="prumo text-light-600 promo-medium text-20"
                        >
                            Además podrás armar tu recetario y listas de
                            compras, acceder a Masterclass con chefs referentes
                            y guías de cocina.
                        </Text>
                    </div>
                </Static>
                {typeof window !== 'undefined' && (
                    <div className="pt-24 flex gap-24 ai-center jc-center col-span-8 col-span-12_md">
                        <Button
                            title="Ir a Suscribirse"
                            data-test-id="button-suscribe-signwall"
                            variant="accent"
                            href={`${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4?cv=800&fc=825&callback=${window?.btoa(
                                window.location?.href
                            )}`}
                            onClick={() => {
                                addEventToDataLayer({
                                    event: 'subscription_start',
                                    button: buttonSubscribeText
                                });
                            }}
                        >
                            suscribite
                        </Button>
                        {userType !== 'logged' && (
                            <Button
                                title="Ir a Iniciar Sesión"
                                data-test-id="button-login-signwall"
                                variant="link"
                                data-variant="link"
                                href={`${FOODIT_LOGIN_URL}${window?.btoa(
                                    window.location?.href
                                )}`}
                            >
                                <span className="uppercase">iniciá sesión</span>
                            </Button>
                        )}
                    </div>
                )}
            </div>
            <div className="bg-subscription-positive h-5" />
        </section>
    );
}

export default SingWall;
