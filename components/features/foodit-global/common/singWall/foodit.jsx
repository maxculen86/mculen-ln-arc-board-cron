import React from 'react';
import Static from 'fusion:static';
import {
    FOODIT_LOGIN_URL,
    SITIO_SEGURO_REGISTRACION
} from 'fusion:environment';

import { Button } from '@ln/foodit-ui-button';
import { Text } from '@ln/common-ui-text';
import useGetUserConfig from '../../hooks/useGetUserConfig';

import { pushFooditEvent } from '../utils/pushFooditEvent';

function SingWall() {
    const { userType = 'loading' } = useGetUserConfig();

    return (
        <section className="bg-neutral-light-100 relative w-100vw as-center shadow-top">
            <div className="container py-16 py-24_md py-32_lg text-center grid grid-cols-12_md">
                <Static htmlOnly persistent id="signwall-content">
                    <div className="flex flex-column gap-12 col-span-8 col-span-12_md">
                        <Text
                            as="h2"
                            className="prumo prumo-semibold text-light-800 text-28 text-36_md text-40_lg"
                        >
                            Este contenido es exclusivo para suscriptores.
                        </Text>
                        <Text
                            as="p"
                            className="prumo text-light-600 promo-medium text-20"
                        >
                            Suscribite a Foodit para ingresar y accedé a miles
                            de ideas para cocinar mejor.
                        </Text>
                    </div>
                </Static>
                {typeof window !== 'undefined' && (
                    <div className="pt-24 flex gap-24 ai-center jc-center col-span-8 col-span-12_md">
                        <Button
                            title="Ir a Suscribirse"
                            data-test-id="button-suscribe-signwall"
                            variant="accent"
                            href={`${SITIO_SEGURO_REGISTRACION}/foodit/suscribirme?cv=800&fc=50000046&callback=${window?.btoa(window.location?.href)}`}
                            onClick={() => {
                                pushFooditEvent({
                                    event: 'subscription_start',
                                    button: 'soft_paywall'
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
                                onClick={() => {
                                    pushFooditEvent({
                                        event: 'e_linkclick',
                                        action: 'N/A',
                                        category: 'soft_paywall',
                                        label: 'inicia_sesion'
                                    });
                                }}
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
