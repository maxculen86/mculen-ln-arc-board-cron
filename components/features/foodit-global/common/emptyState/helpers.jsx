import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { Link } from '@ln/foodit-ui-link';
import {
    SITIO_SEGURO_REGISTRACION,
    FOODIT_LOGIN_URL
} from 'fusion:environment';

export const titleByVariant = {
    'barrier-unlogged': '¡Exclusivo suscriptor!',
    'barrier-logged': '¡Exclusivo suscriptor!',
    'empty-state': '¡Aún no hay nada por acá!',
    '404': '¡Uppps! Contenido en preparación'
};

export const descriptionByVariant = {
    'barrier-logged':
        'Para realizar esta acción es necesario que tengas una suscripción.',
    'barrier-unlogged':
        'Para realizar esta acción es necesario que inicies sesión.',
    'empty-state': (
        <span>
            Presioná el botón{' '}
            <Icon size={16} className="vertical-align-middle">
                <IconSprite name="bookmark" critical />
            </Icon>{' '}
            para guardar el contenido que te gusta y ¡Listo!
        </span>
    ),
    '404': (
        <span>
            Mientras te invitamos a seguir navegando en{' '}
            <Link
                href="/"
                title="Ir a Foodit"
                className="inline-flex"
                variant="secondary"
            >
                Foodit
            </Link>
        </span>
    )
};

// TODO: agregar eventos para login y suscripción
export const buttonPropsByVariant = {
    'barrier-logged': {
        label: 'Suscribite',
        variant: 'accent',
        onClick: () => {
            location.href = `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4/?cv=670&fc=826&callback=${window.btoa(
                window.location.href
            )}}`;
        }
    },
    'barrier-unlogged': {
        label: 'Inicia sesión',
        variant: 'primary',
        onClick: () =>
            (location.href = FOODIT_LOGIN_URL + window.btoa(location.href))
    },
    'empty-state': {
        label: false
    }
};

export const imagePropsByVariant = {
    'barrier-unlogged': {
        asset: 'barrier-state.webp',
        alt: 'Para realizar esta acción es necesario que inicies sesión.',
        width: 147,
        height: 110
    },
    'barrier-logged': {
        asset: 'barrier-state.webp',
        alt:
            'Para realizar esta acción es necesario que tengas una suscripción.',
        width: 147,
        height: 110
    },
    'empty-state': {
        asset: 'empty-state-recetario.png',
        alt: '¡Aún no hay nada por acá!',
        width: 147,
        height: 152
    },
    '404': {
        asset: 'logo-404.png',
        alt: 'Logo Foodit',
        width: 91,
        height: 87
    }
};

export const getVariantBarrier = userType => {
    const variants = {
        logged: 'barrier-logged',
        unlogged: 'barrier-unlogged',
        subscribed: 'empty-state'
    };
    return variants[userType];
};
