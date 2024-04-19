import React from 'react';
import { toggleDrawer } from '@ln/common-ui-drawer';
import siteProperties from '../../../../../properties/sites/foodit';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { Icon } from '@ln/common-ui-icon';

const { layoutsName = {} } = siteProperties || {};

const defaultClassName = 'lg-none';
const defaultButtons = [
    { title: 'Ir a Mis recetas', children: 'Mis recetas', href: '/recetario/' },
    {
        title: 'Ir a Lista de compras',
        children: 'Lista de compras',
        href: '/lista-de-compras/'
    }
];

export const floatingButtonConfig = {
    [layoutsName.FooditHome]: {
        observerSelector: '.card:first-of-type',
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
    [layoutsName.FooditRecetario]: {
        observerSelector: '.floating-button-sentinel',
        className: 'sm-only',
        buttons: [
            // {
            //     title: 'Crear colección',
            //     children: 'Crear colección'
            //     TODO: agregar callback o href para el botón
            // },
            {
                title: 'Elegir colección',
                children: 'Elegir colección',
                onClick: () =>
                    toggleDrawer({ id: 'drawer-recetario', show: true })
            }
        ]
    },
    [layoutsName.FooditListadoCompras]: {
        observerSelector: '.floating-button-sentinel',
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
                )
                // TODO: agregar callback para el botón
            }
        ]
    },
    [layoutsName.FooditAcumuladoChef]: {
        observerSelector: '.floating-button-sentinel',
        className: defaultClassName,
        buttons: defaultButtons
    },
    [layoutsName.FooditChef]: {
        observerSelector: '.floating-button-sentinel',
        className: defaultClassName,
        buttons: defaultButtons
    }
};

export const getConfigByLayout = layout => floatingButtonConfig[layout];
