import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import siteProperties from '../../../../../properties/sites/foodit';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const { layoutsName = {} } = siteProperties || {};

const FLOATING_BUTTON_SENTINEL = '.floating-button-sentinel';
const HEADER_SENTINEL_CLASS = '.header-sentinel';

const defaultClassName = 'lg-none';
const defaultButtons = [
    {
        title: 'Ir a Mis recetas',
        children: 'Mis recetas',
        href: '/recetario/',
        onClick: () =>
            addEventToDataLayerV2({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'mis_recetas'
            })
    },
    {
        title: 'Ir a Menú semanal',
        children: 'Mi menú semanal',
        href: '/mi-menu-semanal/'
    },
    {
        title: 'Ir a Lista de compras',
        children: 'Lista de compras',
        href: '/lista-de-compras/',
        onClick: () =>
            addEventToDataLayerV2({
                event: 'e_linkclick',
                category: 'autogestion',
                label: 'perfil',
                action: 'lista_de_compras'
            })
    }
];

const defaultConfig = {
    observerSelector: HEADER_SENTINEL_CLASS,
    className: defaultClassName,
    buttons: defaultButtons
};

export const floatingButtonConfig = {
    [layoutsName.FooditHome]: defaultConfig,
    [layoutsName.FooditFichaReceta]: defaultConfig,
    [layoutsName.FooditFichaNota]: defaultConfig,
    [layoutsName.FooditAcumulado]: defaultConfig,
    [layoutsName.FooditAcumuladoChef]: defaultConfig,
    [layoutsName.FooditChef]: defaultConfig,
    [layoutsName.FooditMenuSemanal]: null,
    [layoutsName.FooditRecetario]: (callbacks = []) => {
        const [toggleDrawerRecetario = () => null] = callbacks;
        return {
            observerSelector: HEADER_SENTINEL_CLASS,
            className: 'sm-only',
            buttons: [
                {
                    title: 'Elegir colección',
                    children: 'Elegir colección',
                    onClick: () => toggleDrawerRecetario()
                }
            ]
        };
    }
};

export const getConfigByLayout = (layout, callbacks = []) => {
    const config = floatingButtonConfig[layout];

    if (typeof config === 'function') return config(callbacks);
    if (config) return config;
    return {};
};

export const customFloatingButtonConfig = {
    [layoutsName.FooditListadoCompras]: (titleButton, callbacks = []) => {
        const [copyAction = () => null] = callbacks;

        return {
            observerSelector: FLOATING_BUTTON_SENTINEL,
            className: 'sm-only',
            buttons: [
                {
                    title: 'Copiar todo',
                    children: (
                        <>
                            <Icon size={16}>
                                <IconSprite name="copy" />
                            </Icon>
                            {titleButton}
                        </>
                    ),
                    onClick: () => copyAction()
                }
            ]
        };
    }
};

export const getCustomConfigByLayout = (layout, titleButton, callbacks) =>
    (customFloatingButtonConfig[layout] &&
        customFloatingButtonConfig[layout](titleButton, callbacks)) ||
    {};
