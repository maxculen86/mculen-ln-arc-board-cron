import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/foodit-ui-link';
import {
    SITIO_SEGURO_REGISTRACION,
    FOODIT_LOGIN_URL
} from 'fusion:environment';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import siteProperties from '../../../../../properties/sites/foodit';

const EMPTY_STATE = '¡Aún no hay nada por acá!';
const NEED_SUBSCRIPTION =
    'Para realizar esta acción es necesario que tengas una suscripción.';

export const titleByVariant = {
    'barrier-unlogged': '¡Exclusivo suscriptores!',
    'barrier-logged': '¡Exclusivo suscriptores!',
    'empty-state': EMPTY_STATE,
    'search-engine': 'Nada por acá',
    404: '¡Uppps! Contenido en preparación'
};

export const descriptionByVariant = ({ layout, variant }) => {
    const { layoutsName = {} } = siteProperties || {};
    const isLayoutShoppingList = layout === layoutsName.FooditListadoCompras;
    const isLayoutMenuSemanal = layout === layoutsName.FooditMenuSemanal;

    const getEmptyStateMessage = (message, iconName) => (
        <span>
            Presioná el botón
            <Icon size={16} className="vertical-align-middle mx-4">
                <IconSprite name={iconName} critical />
            </Icon>
            {message}
        </span>
    );

    let emptyStateMessage;

    if (isLayoutShoppingList) {
        emptyStateMessage = getEmptyStateMessage(
            'en la receta para agregar los ingredientes que necesitas y ¡Listo!',
            'shopping-list'
        );
    } else if (isLayoutMenuSemanal) {
        emptyStateMessage = getEmptyStateMessage(
            'para planificar tu menú semanal y ¡Listo!',
            'weekly-menu'
        );
    } else {
        emptyStateMessage = getEmptyStateMessage(
            'para guardar el contenido que te gusta y ¡Listo!',
            'bookmark'
        );
    }
    const optionsDescription = {
        'barrier-logged': NEED_SUBSCRIPTION,
        'barrier-unlogged': NEED_SUBSCRIPTION,
        'empty-state': emptyStateMessage,
        404: (
            <span>
                <span>Mientras te invitamos a seguir navegando en </span>
                <Link
                    href="/"
                    title="Ir a Foodit"
                    className="inline-flex"
                    variant="secondary"
                >
                    Foodit
                </Link>
            </span>
        ),
        'search-engine': (
            <span className="roboto text-24 text-center">
                No se encontraron resultados
            </span>
        )
    };
    return optionsDescription[variant];
};

export const buttonPropsByVariant = {
    'barrier-logged': {
        label: 'Suscribite',
        variant: 'accent',
        href: `${SITIO_SEGURO_REGISTRACION}/suscripcion/V/4/?cv=670&fc=826&callback=${
            typeof window !== 'undefined'
                ? window.btoa(window.location.href)
                : ''
        }`
    },
    'barrier-unlogged': {
        label: 'Iniciá sesión',
        variant: 'link',
        href:
            FOODIT_LOGIN_URL +
            (typeof window !== 'undefined'
                ? window.btoa(window.location.href)
                : '')
    },
    'empty-state': {
        label: false
    }
};

export const imagePropsByVariant = {
    'barrier-unlogged': {
        asset: 'barrier-state.webp',
        alt: NEED_SUBSCRIPTION,
        width: 147,
        height: 110
    },
    'barrier-logged': {
        asset: 'barrier-state.webp',
        alt: NEED_SUBSCRIPTION,
        width: 147,
        height: 110
    },
    'empty-state': {
        asset: 'empty-state-recetario.webp',
        alt: EMPTY_STATE,
        width: 147,
        height: 152
    },
    'search-engine': {
        asset: 'empty-state-recetario.webp',
        alt: EMPTY_STATE,
        width: 147,
        height: 152
    },
    404: {
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
