import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Link } from '@ln/foodit-ui-link';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import siteProperties from '../../../../../properties/sites/foodit';

const EMPTY_STATE = '¡Aún no hay nada por acá!';
const classNameImg = '-mb-8 w-78 h-80 w-94_md h-96_md w-110_lg h-112_lg';
const NEED_SUBSCRIPTION =
    'Para realizar esta acción es necesario que tengas una suscripción.';

export const titleByVariant = {
    'barrier-unlogged': 'Exclusivo para suscriptores',
    'barrier-logged': 'Exclusivo para suscriptores',
    'empty-state': EMPTY_STATE,
    'search-engine': '¡Nada por acá!',
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
            'AGREGAR A LA LISTA en la receta para agregar los ingredientes que necesitas y ¡Listo!',
            'shopping-list'
        );
    } else if (isLayoutMenuSemanal) {
        emptyStateMessage = getEmptyStateMessage(
            'AGREGAR AL MENÚ SEMANAL en la receta para organizar tus comidas y ¡Listo!',
            'weekly-menu'
        );
    } else {
        emptyStateMessage = getEmptyStateMessage(
            'GUARDAR en la receta para acceder al contenido cuando quieras y ¡Listo!',
            'bookmark'
        );
    }

    function messageByLayout() {
        const isFooditIA = layout === layoutsName.FooditChatIA;

        return isFooditIA
            ? 'Para ver la respuesta de Foodit IA es necesario que tengas una suscripción.'
            : NEED_SUBSCRIPTION;
    }

    const optionsDescription = {
        'barrier-logged': messageByLayout(),
        'barrier-unlogged': messageByLayout(),
        'empty-state': emptyStateMessage,
        404: (
            <span>
                <span className="roboto text-16 text-light-600">
                    Mientras te invitamos a seguir navegando en{' '}
                </span>
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
            <span className="roboto text-16 text-light-600 text-center">
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
        className: '-mb-8 w-87 h-91'
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
