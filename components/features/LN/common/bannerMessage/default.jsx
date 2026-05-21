import React from 'react';
import { cx } from '@ln/ds-cva';
import Button from '../../../ui/ln/button/default';
import Link from '../../../ui/ln/link/default';
import { configBadgeSuscriptor } from './bannerHelper';
import BadgeBanner from './components/badgeBanner';

function BannerMessage({
    badge = {},
    title,
    subtitle,
    special = 'Suscribirte',
    specialUrl,
    secondary = 'Iniciar sesión',
    secondaryUrl,
    className
}) {
    const { onlySuscriptors, ...badgeData } = badge;
    const badgeConfig = onlySuscriptors
        ? { ...configBadgeSuscriptor, className: 'pl-4 px-4' }
        : badgeData;
    const withLinks = secondaryUrl && specialUrl;

    const sectionClassName = cx(
        'bg-neutral-50 border-1 border-neutral-200 pt-24 pb-32 px-16 flex flex-col md:flex-row justify-end md:items-center gap-16 mx-auto mb-32',
        className
    );

    return (
        <div data-tw className="contents">
            <section
                aria-label={title || subtitle}
                className={sectionClassName}
            >
                <div className="flex gap-8 flex-col flex-1">
                    {badgeConfig && <BadgeBanner {...badgeConfig} />}
                    {title && (
                        <h3 className="font-primary text-subheading-md font-w-bold">
                            {title}
                        </h3>
                    )}
                    <p className="font-secondary text-body-md">{subtitle}</p>
                </div>
                {withLinks && (
                    <div className="flex gap-16 items-center justify-items-end">
                        <Button asChild color="secondary" variant="outline">
                            <Link href={secondaryUrl}>{secondary}</Link>
                        </Button>
                        <Button color="subscription" asChild>
                            <Link href={specialUrl}>{special}</Link>
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default BannerMessage;
