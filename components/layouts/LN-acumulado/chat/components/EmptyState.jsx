import React from 'react';
import { LOGIN_URL, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import { Badge } from '@ln/ds-common-badge';
import Button from '../../../../features/ui/ln/button/default';
import Icon from '../../../../features/ui/ln/icon/default';

export function EmptyState({ isSubscribed }) {
    const currentUrl =
        typeof window !== 'undefined' ? window.btoa(window.location.href) : '';

    if (isSubscribed) {
        return (
            <>
                <div className="flex items-center bg-highlight-default w-16 h-16 rounded-full">
                    <Icon className="mx-auto" size={8} name="vip-crow" />
                </div>

                <p className="font-secondary text-small-lg">
                    Nueva herramienta para suscriptores.
                </p>
            </>
        );
    }

    return (
        <section className="my-16 xl:my-0 h-fit border border-all border-neutral-200 bg-neutral-50 px-16 pt-24 pb-32 xl:pt-16 xl:pb-16 flex flex-col sm:flex-row xl:flex-col gap-32">
            <div className="flex flex-column gap-8 w-full">
                <div className="flex gap-4">
                    <Badge
                        size="custom"
                        className="px-4 py-4 text-label-sm"
                        textTransform="none"
                        color="white"
                    >
                        <div className="flex items-center bg-highlight-default w-16 h-16 rounded-full">
                            <Icon
                                className="mx-auto"
                                size={8}
                                name="vip-crow"
                            />
                        </div>
                        Suscriptores
                    </Badge>
                </div>
                <p className="font-secondary text-body-md">
                    Iniciá sesión o suscribite para interactuar con LA NACION
                    IA.
                </p>
            </div>
            <div className="flex gap-16 items-center">
                <Button variant="outline" color="secondary" asChild>
                    <a href={`${LOGIN_URL}${currentUrl}`}>Iniciar sesión</a>
                </Button>
                <Button color="subscription" asChild>
                    <a
                        href={`${SITIO_SEGURO_REGISTRACION}/ln/suscribirme?callback=${currentUrl}`}
                    >
                        Suscribite
                    </a>
                </Button>
            </div>
        </section>
    );
}
