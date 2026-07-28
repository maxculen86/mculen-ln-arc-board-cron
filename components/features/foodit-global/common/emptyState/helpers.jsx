import React from 'react';
import Icon from '../../../ui/foodit/icon/default';
import siteProperties from '../../../../../properties/sites/foodit';

const EMPTY_STATE = '¡Aún no hay nada por acá!';
const classNameImg =
    '-mb-8 max-w-78 max-h-80 md:max-w-94 md:max-h-96 xl:max-w-110 xl:max-h-112';
const NEED_SUBSCRIPTION =
    'Para realizar esta acción es necesario que tengas una suscripción.';

const getEmptyStateMessage = (message, iconName) => (
    <span>
        Presioná el botón
        <Icon size={16} name={iconName} className="pt-6 mx-4" type="critical" />
        {message}
    </span>
);

export const titleByVariant = {
    'barrier-unlogged': 'Exclusivo para suscriptores',
    'barrier-logged': 'Exclusivo para suscriptores',
    'empty-state': EMPTY_STATE,
    'search-engine': '¡Nada por acá!',
    404: '¡Uppps! Contenido en preparación'
};

export const descriptionByVariant = ({ layout, variant }) => {
    const { layoutsName = {} } = siteProperties || {};

    const emptyStateMessageByLayout = {
        [layoutsName.FooditListadoCompras]: getEmptyStateMessage(
            'AGREGAR A LA LISTA en la receta para agregar los ingredientes que necesitas y ¡Listo!',
            'shopping-list'
        ),
        [layoutsName.FooditMenuSemanal]: getEmptyStateMessage(
            'AGREGAR AL MENÚ SEMANAL en la receta para organizar tus comidas y ¡Listo!',
            'weekly-menu'
        )
    };

    const emptyStateMessage =
        emptyStateMessageByLayout[layout] ??
        getEmptyStateMessage(
            'GUARDAR en la receta para acceder al contenido cuando quieras y ¡Listo!',
            'bookmark'
        );

    const barrierMessage =
        layout === layoutsName.FooditChatIA
            ? 'Para ver la respuesta de Foodit IA es necesario que tengas una suscripción.'
            : NEED_SUBSCRIPTION;

    const optionsDescription = {
        'barrier-logged': barrierMessage,
        'barrier-unlogged': barrierMessage,
        'empty-state': emptyStateMessage,
        404: (
            <p className="text-16">
                <span className="font-secondary text-secondary-default">
                    Mientras te invitamos a seguir navegando en{' '}
                </span>
                <a
                    href="/"
                    title="Ir a Foodit"
                    className="inline-flex text-accent-default hover:opacity-80"
                >
                    Foodit
                </a>
            </p>
        ),
        'search-engine': (
            <span className="font-secondary text-16 text-secondary-default text-center">
                No se encontraron resultados
            </span>
        )
    };
    return optionsDescription[variant];
};

export const imagePropsByVariant = {
    'barrier-unlogged': {
        asset: false
    },
    'barrier-logged': {
        asset: false
    },
    'empty-state': {
        asset: 'empty-state-recetario.webp',
        alt: EMPTY_STATE,
        className: classNameImg
    },
    'search-engine': {
        asset: 'empty-state-recetario.webp',
        alt: EMPTY_STATE,
        className: classNameImg
    },
    404: {
        asset: 'logo-404.png',
        alt: 'Logo Foodit',
        className: '-mb-8 max-w-87 max-h-91'
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
