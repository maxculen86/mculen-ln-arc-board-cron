import { toggleDrawer } from '@ln/common-ui-drawer';
import siteProperties from '../../../../../properties/sites/foodit';

const { layoutsName = {} } = siteProperties || {};

const defaultClassName = 'lg-none';
const defaultButtons = [
    { title: 'Ir a Mis recetas', children: 'Mis recetas', href: '/recetario' },
    { title: 'Ir a Lista de compras', children: 'Lista de compras', href: '#' } // TODO: agregar href cuando se cree el layout
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
            {
                title: 'Crear colección',
                children: 'Crear colección'
                // TODO: agregar callback o href para el botón
            },
            {
                title: 'Elegir colección',
                children: 'Elegir colección',
                onClick: () =>
                    toggleDrawer({ id: 'drawer-recetario', show: true })
            }
        ]
    }
};

export const getConfigByLayout = layout => floatingButtonConfig[layout];
