import React from 'react';
import { SITE_FOODIT } from 'fusion:environment';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

const CLUB_LA_NACION_ROUTE = '/club-la-nacion';

const listDescubrir = [
    '/restaurantes',
    '/nutricion',
    CLUB_LA_NACION_ROUTE,
    '/protocolo',
    '/tendencias',
    '/ingredientes',
    '/trucos',
    '/chefs'
];

const iconList = [
    {
        section: '/saladas',
        icon: <IconSprite name="salty" />
    },
    {
        section: '/dulces',
        icon: <IconSprite name="ice-cream" />
    },
    {
        section: '/dieta',
        icon: <IconSprite name="diet" />
    },
    {
        section: '/que-cocinar-hoy',
        icon: <IconSprite name="resto" />
    }
];

const setPageUrl = (path = '') => `${SITE_FOODIT}${path}/`;

const transformSubategorie = (subcategoryList = []) =>
    subcategoryList.map(
        ({ name: nameSubcategory, _id: idSubcategory, children = [] } = {}) => {
            const subCategorysWithoutUrl = [
                '/recetas/dietas',
                '/recetas/dieta',
                '/recetas/que-cocinar-hoy'
            ];
            return {
                title: {
                    text: nameSubcategory,
                    href: subCategorysWithoutUrl.includes(idSubcategory)
                        ? null
                        : setPageUrl(idSubcategory),
                    icon: iconList.find(icon =>
                        idSubcategory.includes(icon.section)
                    ).icon
                },
                items: children.map(
                    ({ name: nameChildren, _id: idChildren } = {}) => ({
                        text: nameChildren,
                        href: setPageUrl(idChildren)
                    })
                )
            };
        }
    );

const orderChildrens = children => {
    const filteredChildren = children.filter(
        ({ _id: id }) => id !== CLUB_LA_NACION_ROUTE
    );

    const clubLaNacion = children.find(
        ({ _id: id }) => id === CLUB_LA_NACION_ROUTE
    );

    return clubLaNacion ? [...filteredChildren, clubLaNacion] : children;
};

export default function transformMenuData({
    children: childrenProp = []
} = {}) {
    const children = orderChildrens(childrenProp);
    const initialMenu = [
        { title: 'Recetas', data: [] },
        {
            title: 'Descubrir',
            data: [
                {
                    items: [
                        {
                            text: 'Chefs protagonistas',
                            href: `${SITE_FOODIT}/chefs-protagonistas/`
                        }
                    ]
                }
            ]
        },
        { title: 'Conocenos', href: `https://conocenos.foodit.com.ar/` }
    ];
    return children.reduce((acc, category) => {
        const { name, _id, children: childrenCategory } = category || {};
        const pageUrl = setPageUrl(_id);

        if (childrenCategory.length) {
            const dataSections = transformSubategorie(childrenCategory);
            acc[0].data = dataSections;
        } else if (listDescubrir.includes(_id)) {
            acc[1].data[0].items.push({
                text: name,
                href: pageUrl
            });
        } else {
            acc.push({
                title: name,
                href: pageUrl
            });
        }

        return acc;
    }, initialMenu);
}
