import React from 'react';
import Icon from '../../../../features/ui/ln/icon/default';

export function EjesCard() {
    const mockEjes = [
        {
            title: 'Simulador de llaves',
            description: 'Cómo quedarían los cruces',
            icon: 'merger',
            href: 'https://canchallena.lanacion.com.ar/futbol/mundial/llaves/'
        },
        {
            title: 'Fixture',
            description: 'Calendario completo',
            icon: 'calendar',
            href: 'https://canchallena.lanacion.com.ar/futbol/mundial/fixture/'
        }
    ];
    return (
        <div className="flex items-center gap-responsive md:col-span-8 xl:col-span-10 pb-32">
            {mockEjes.map(({ title, description, icon, href }) => (
                <a
                    key={title}
                    href={href}
                    className="bg-[url('/pf/resources/images/logo-mundial-mobile.svg')] md:bg-[url('/pf/resources/images/logo-mundial.svg')] bg-no-repeat bg-right bg-[length:auto_100%] items-center gap-8 md:gap-12 flex hover:opacity-80 h-[78px] md:h-[80px] text-start w-full p-16 bg-neutral-1 border border-all border-neutral-300 rounded-12 font-secondary text-small-lg text-base-default disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="flex items-center justify-center bg-muted min-w-[32px] min-h-[32px] md:min-w-[48px] md:min-h-[48px] rounded-full">
                        <Icon className="w-[16px] md:w-[24px]" name={icon} />
                    </div>
                    <div>
                        <p className="prumo prumo-semibold text-body-lg prumo-bold">
                            {title}
                        </p>
                        <p className="hidden xl:flex font-normal text-body-sm text-base-light pt-2">
                            {description}
                        </p>
                    </div>
                </a>
            ))}
        </div>
    );
}
