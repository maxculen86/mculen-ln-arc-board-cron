import React from 'react';
import { Link } from '@ln/foodit-ui-link';
import { SITE_FOODIT } from 'fusion:environment';
import { Text } from '@ln/common-ui-text';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export function MoreInfo() {
    return (
        <ul className="flex flex-column gap-16 gap-24_md gap-32_lg">
            <li className="border border-top border-thin border-light-200 pt-16 pt-24_md pt-32_lg">
                <Text className="roboto roboto-bold text-16 text-light-800">
                    ¿Necesitás reemplazar algún ingrediente?
                </Text>
                <Text
                    as="p"
                    className="roboto roboto-regular text-16 text-light-800"
                >
                    Mirá la{' '}
                    <Link
                        variant="secondary"
                        href={`${SITE_FOODIT}/guia-de-cocina/guia-de-sustituciones-nid16042024/`}
                        className="text-16 roboto roboto-bold inline-flex"
                        title="Ir a Guía de Sustitutos"
                    >
                        Guía de Sustitutos
                    </Link>
                </Text>
            </li>
            <li className="border border-top border-thin border-light-200 pt-16 pt-24_md pt-32_lg">
                <Link
                    variant="secondary"
                    uppercase
                    href={`${SITE_FOODIT}/guia-de-cocina/guia-de-equivalencias-nid16042024/`}
                    className="text-12 roboto roboto-bold inline-flex"
                    title="Ir a Equivalencias de medidas"
                >
                    Equivalencias de medidas
                    <Icon size={16}>
                        <IconSprite name="arrow-right" />
                    </Icon>
                </Link>
            </li>
        </ul>
    );
}
