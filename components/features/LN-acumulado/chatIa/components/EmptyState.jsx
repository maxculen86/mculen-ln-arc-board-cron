import React from 'react';
import { LOGIN_URL, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import BannerMessage from '../../../LN/common/bannerMessage/default';
import IconSubscribe from '../../../LN/common/iconSubscribe/default';

export function EmptyState({ isSubscribed }) {
    const currentUrl =
        typeof window !== 'undefined' ? window.btoa(window.location.href) : '';

    if (isSubscribed) {
        return (
            <>
                <IconSubscribe />

                <p className="font-secondary text-small-lg">
                    Nueva herramienta para suscriptores.
                </p>
            </>
        );
    }

    return (
        <BannerMessage
            subtitle="Iniciá sesión o suscribite para interactuar con LA NACION IA."
            secondaryUrl={`${LOGIN_URL}${currentUrl}`}
            specialUrl={`${SITIO_SEGURO_REGISTRACION}/ln/suscribirme?callback=${currentUrl}`}
            badge={{
                onlySuscriptors: true
            }}
            className="xl:col-span-10"
        />
    );
}
