import React from 'react';
import siteProperties from '../../../../../properties/sites/foodit';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from '../../../../private/LN/common/utils/addEventToDataLayer';
import { Icon } from '@ln/common-ui-icon';

const { layoutsName = {} } = siteProperties || {};

const FLOATING_BUTTON_SENTINEL = '.floating-button-sentinel';

const defaultClassName = 'lg-none';
const defaultButtons = [
    {
        title: 'Ir a Mis recetas',
        children: 'Mis recetas',
        href: '/recetario/',
        onClick: () =>
            addEventToDataLayer({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'mis_recetas'
            })
    },
    {
        title: 'Ir a Lista de compras',
        children: 'Lista de compras',
        href: '/lista-de-compras/',
        onClick: () =>
            addEventToDataLayer({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'lista_de_compras'
            })
    }
];

export const floatingButtonConfig = {
    [layoutsName.FooditHome]: {
        observerSelector: '.header-sentinel',
        className: defaultClassName,
        buttons: defaultButtons
    },
    [layoutsName.FooditFichaReceta]: {
        observerSelector: '.recipe',
        className: defaultClassName,
        buttons: defaultButtons
    },
    [layoutsName.FooditFichaNota]: {
        observerSelector: '.note-article-container',
        className: defaultClassName,
        buttons: defaultButtons
    },
    [layoutsName.FooditAcumulado]: {
        observerSelector: '.card',
        className: defaultClassName,
        buttons: defaultButtons
    },
    [layoutsName.FooditRecetario]: (callbacks = []) => {
        const [toggleDrawer = () => null] = callbacks;
        return {
            observerSelector: FLOATING_BUTTON_SENTINEL,
            className: 'sm-only',
            buttons: [
                {
                    title: 'Elegir colección',
                    children: 'Elegir colección',
                    onClick: () => toggleDrawer()
                }
            ]
        };
    },
    [layoutsName.FooditAcumuladoChef]: {
        observerSelector: FLOATING_BUTTON_SENTINEL,
        className: defaultClassName,
        buttons: defaultButtons
    },
    [layoutsName.FooditChef]: {
        observerSelector: FLOATING_BUTTON_SENTINEL,
        className: defaultClassName,
        buttons: defaultButtons
    }
};

export const getConfigByLayout = (layout, callbacks = []) => {
    const config = floatingButtonConfig[layout];

    if (typeof config === 'function') return config(callbacks);
    if (config) return config;
    return {};
};

export const customFloatingButtonConfig = {
    [layoutsName.FooditListadoCompras]: (callbacks = []) => {
        const [copyAction = () => null] = callbacks;

        return {
            observerSelector: FLOATING_BUTTON_SENTINEL,
            className: defaultClassName,
            buttons: [
                {
                    title: 'Copiar todo',
                    children: (
                        <>
                            <Icon size={16}>
                                <IconSprite name="copy" />
                            </Icon>
                            Copiar todo
                        </>
                    ),
                    onClick: () => copyAction()
                }
            ]
        };
    }
};

export const getCustomConfigByLayout = (layout, callbacks) =>
    (customFloatingButtonConfig[layout] &&
        customFloatingButtonConfig[layout](callbacks)) ||
    {};
