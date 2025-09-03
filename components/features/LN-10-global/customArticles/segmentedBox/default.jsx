/* eslint-disable react/prop-types */
import React from 'react';
import { Image } from '@ln/common-ui-image';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import { linksSegmentedBox } from './config';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

export function CustomArticleSegmentedBox({ buttonLogo }) {
    return (
        <div className="as-article flex flex-column gap-8 uppercase text-neutral-light-800">
            <Text className="inline-flex ai-center gap-4 font-bold text-12">
                <Icon size={16}>
                    <IconSprite name="arrowContainer" />
                </Icon>
                CALCULADORAS
            </Text>
            <ul className="flex flex-column gap-4 pl-20 mb-8 text-12_130">
                {linksSegmentedBox.map(({ href, text, title, ariaLabel }) => (
                    <li key={href}>
                        <Link
                            unstyled
                            href={href}
                            title={title}
                            aria-label={ariaLabel}
                            className="text-12_130"
                        >
                            {text}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link
                className="inline-flex ai-center gap-4 text-12 font-bold mb-8"
                href="https://www.lanacion.com.ar/dolar-hoy"
                unstyled
                title="Ir a cotizaciones"
                aria-label="Ir a cotizaciones"
            >
                <Icon size={16}>
                    <IconSprite name="arrowContainer" />
                </Icon>
                COTIZACIONES
            </Link>
            <hr className="mb-8" />
            <Link
                unstyled
                href="https://www.lanacion.com.ar/economia/"
                title="Ir a economía"
                aria-label="Ir a economía"
            >
                <Image {...buttonLogo} className="h-36 w-auto" />
            </Link>
        </div>
    );
}
