import React from 'react';
import Link from '../../../../ui/ln/link/default';
import Icon from '../../../../ui/ln/icon/default';
import { FooterLinkColumn } from './FooterLinkColumn';

export function FooterLinksSection({ footerData, footerIcons }) {
    const socialNetworks = [
        {
            title: 'Facebook',
            href: 'https://www.facebook.com/lanacion',
            icon: footerIcons?.facebook
        },
        {
            title: 'X',
            href: 'https://x.com/LANACION/',
            icon: footerIcons?.twitter
        },
        {
            title: 'Instagram',
            href: 'https://www.instagram.com/lanacioncom/',
            icon: footerIcons?.instagram
        },
        {
            title: 'RSS',
            href: 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml',
            icon: footerIcons?.rss
        }
    ];
    return (
        <div className="flex justify-center gap-32">
            <FooterLinkColumn
                title="Secciones"
                items={footerData.secciones.left}
            />
            <FooterLinkColumn
                items={footerData.secciones.right}
                firstItemMargin="lg:mt-34"
            />
            <FooterLinkColumn title="Revistas" items={footerData.revistas} />
            <FooterLinkColumn
                items={footerData.productos}
                firstItemMargin="xl:mt-34"
            />
            <FooterLinkColumn
                items={footerData.masInformacion}
                firstItemMargin="xl:mt-34"
            />
            <div className="flex flex-col justify-center md:justify-start gap-16 items-stretch">
                <div className="flex flex-col gap-16 items-center">
                    <p className="text-center text-body-sm leading-[110%] tracking-[-0.3px] font-bold">
                        Redes sociales
                    </p>
                    <ul className="flex gap-24 justify-center md:grid md:grid-cols-2 lg:flex">
                        {socialNetworks.map(({ title, href, icon }) => (
                            <li className="flex" key={title}>
                                <Link
                                    title={`Seguirnos en ${title}`}
                                    href={href}
                                    target="_blank"
                                >
                                    <Icon size={24}>{icon}</Icon>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-16 items-center">
                    <p className="text-center text-body-sm leading-[110%] tracking-[-0.3px] font-bold">
                        Descargá la app
                    </p>
                    <ul className="flex gap-24 justify-center items-center md:flex-col">
                        {[
                            {
                                title: 'Google Play',
                                href: 'https://play.google.com/store/apps/details?id=app.lanacion.activity&hl=es_419&pli=1',
                                icon: footerIcons?.storesAndroid,
                                width: 100
                            },
                            {
                                title: 'App Store',
                                href: 'https://apps.apple.com/ar/app/la-nacion/id410689702',
                                icon: footerIcons?.storesIos,
                                width: 100
                            }
                        ].map(({ title, href, icon, width }) => (
                            <li className="flex" key={title}>
                                <Link
                                    title={`Ir a ${title}`}
                                    href={href}
                                    target="_blank"
                                >
                                    <Icon width={width} size="auto">
                                        {icon}
                                    </Icon>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
