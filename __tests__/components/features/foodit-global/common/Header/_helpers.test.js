import React from 'react';
import transformMenuData from '../../../../../../components/features/foodit-global/common/Header/_helpers';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('transformMenuData function', () => {
    test('returns default data when children is an empty array', () => {
        const result = transformMenuData({});
        expect(result).toEqual([
            { title: 'Recetas', data: [] },
            {
                title: 'Descubrir',
                data: [
                    {
                        items: [
                            {
                                text: 'Chef protagonistas',
                                href: 'https://foodit.lanacion.com.ar/chefs/'
                            }
                        ]
                    }
                ]
            }
        ]);
    });

    test('transforms categories with children', () => {
        const input = {
            children: [
                {
                    _id: '/recetas',
                    name: 'Recetas',
                    children: [
                        { _id: '/recetas/dulces', name: 'Dulces', children: [] }
                    ]
                }
            ]
        };

        const result = transformMenuData(input);
        expect(result).toEqual([
            {
                title: 'Recetas',
                data: [
                    {
                        title: {
                            text: 'Dulces',
                            href:
                                'https://foodit.lanacion.com.ar/recetas/dulces/',
                            icon: <mock-icon name="cake" />
                        },
                        items: []
                    }
                ]
            },
            {
                title: 'Descubrir',
                data: [
                    {
                        items: [
                            {
                                text: 'Chef protagonistas',
                                href: 'https://foodit.lanacion.com.ar/chefs/'
                            }
                        ]
                    }
                ]
            }
        ]);
    });

    test('adds item to Descubrir when listDescubrir includes _id', () => {
        const input = {
            children: [
                { _id: '/restaurantes', name: 'Restaurantes', children: [] }
            ]
        };

        const result = transformMenuData(input);
        expect(result).toEqual([
            { title: 'Recetas', data: [] },
            {
                title: 'Descubrir',
                data: [
                    {
                        items: [
                            {
                                text: 'Chef protagonistas',
                                href: 'https://foodit.lanacion.com.ar/chefs/'
                            },
                            {
                                text: 'Restaurantes',
                                href:
                                    'https://foodit.lanacion.com.ar/restaurantes/'
                            }
                        ]
                    }
                ]
            }
        ]);
    });
});
