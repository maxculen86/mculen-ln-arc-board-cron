import React from 'react';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { SITE_FOODIT } from 'fusion:environment';

const listDescubrir = [
    '/restaurantes',
    '/nutricion',
    '/Beneficios-Club-LA-NACION'
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

const transformSubategorie = (subcategoryList = []) => {
    return subcategoryList.map(({ name, _id, children = [] } = {}) => {
        const subCategorysWithoutUrl = [
            '/recetas/dietas',
            '/recetas/que-cocinar-hoy'
        ];
        const newElement = {
            title: {
                text: name,
                href: subCategorysWithoutUrl.includes(_id)
                    ? null
                    : setPageUrl(_id),
                icon: iconList.find(icon => _id.includes(icon.section)).icon
            },
            items: children.map(({ name, _id } = {}) => {
                return {
                    text: name,
                    href: setPageUrl(_id)
                };
            })
        };
        return newElement;
    });
};

export default function transformMenuData({ children = [] } = {}) {
    return children.reduce(
        (acc, category) => {
            const { name, _id, children } = category || {};
            const pageUrl = setPageUrl(_id);

            if (children.length) {
                const dataSections = transformSubategorie(children);
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
        },
        [
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
            }
        ]
    );
}
