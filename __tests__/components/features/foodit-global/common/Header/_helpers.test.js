import React from 'react';
import transformMenuData from '../../../../../../components/features/foodit-global/common/Header/_helpers';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('transformMenuData function', () => {
    it('returns default data when children is an empty array', () => {
        const result = transformMenuData({});
        expect(result).toEqual([
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos'
            }
        ]);
    });

    it('transforms categories with children', () => {
        const input = {
            children: [
                {
                    _id: '/recetas',
                    name: 'Recetas',
                    navigation: {},
                    children: [
                        {
                            _id: '/recetas/dulces',
                            name: 'Dulces',
                            navigation: {},
                            children: []
                        }
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
                        items: [
                            {
                                text: 'Dulces',
                                href: 'https://foodit.lanacion.com.ar/recetas/dulces/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos'
            }
        ]);
    });

    it('uses nav_title when available', () => {
        const input = {
            children: [
                {
                    _id: '/aprende-en-la-cocina',
                    name: 'Aprende en la cocina',
                    navigation: { nav_title: 'Aprendé' },
                    children: [
                        {
                            _id: '/masterclass',
                            name: 'Masterclass de chef',
                            navigation: { nav_title: 'Masterclass' },
                            children: []
                        }
                    ]
                }
            ]
        };

        const result = transformMenuData(input);
        expect(result).toEqual([
            {
                title: 'Aprendé',
                data: [
                    {
                        items: [
                            {
                                text: 'Masterclass',
                                href: 'https://foodit.lanacion.com.ar/masterclass/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos'
            }
        ]);
    });

    it('uses full name on mobile', () => {
        const input = {
            children: [
                {
                    _id: '/aprende-en-la-cocina',
                    name: 'Aprende en la cocina',
                    navigation: { nav_title: 'Aprendé' },
                    children: [
                        {
                            _id: '/masterclass',
                            name: 'Masterclass de chef',
                            navigation: { nav_title: 'Masterclass' },
                            children: []
                        }
                    ]
                }
            ],
            isMobile: true
        };

        const result = transformMenuData(input);
        expect(result).toEqual([
            {
                title: 'Aprende en la cocina',
                data: [
                    {
                        items: [
                            {
                                text: 'Masterclass',
                                href: 'https://foodit.lanacion.com.ar/masterclass/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos'
            },
            {
                href: 'https://foodit.lanacion.com.ar/club-la-nacion/',
                menuType: 'secondary',
                title: 'CLUB LA NACION'
            }
        ]);
    });

    it('should construct URLs with query params for tutorial pages', () => {
        const input = {
            children: [
                {
                    _id: '/aprende-en-la-cocina',
                    name: 'Aprende en la cocina',
                    navigation: { nav_title: 'Aprendé' },
                    children: [
                        {
                            _id: '/tema/tutorial-cocina-salada-yixuf3anyvavjkt5tghbolewzq',
                            name: 'Tutoriales de cocina salada',
                            navigation: {},
                            children: []
                        }
                    ]
                }
            ]
        };

        const result = transformMenuData(input);
        expect(result).toEqual([
            {
                title: 'Aprendé',
                data: [
                    {
                        items: [
                            {
                                text: 'Tutoriales de cocina salada',
                                href: 'https://foodit.lanacion.com.ar/tema/tutorial-cocina-salada-yixuf3anyvavjkt5tghbolewzq/?query=recetas&title=Tutoriales+de+cocina+salada&groups=occasions&itemGroups=Tutoriales+de+cocina+salada',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos'
            }
        ]);
    });

    it('should handle categories without children', () => {
        const input = {
            children: [
                {
                    _id: '/masterclass',
                    name: 'Masterclass',
                    navigation: {},
                    children: []
                }
            ]
        };

        const result = transformMenuData(input);
        expect(result).toEqual([
            {
                href: 'https://foodit.lanacion.com.ar/masterclass/',
                title: 'Masterclass'
            },
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos'
            }
        ]);
    });

    it('should handle multiple categories', () => {
        const input = {
            children: [
                {
                    _id: '/aprende-en-la-cocina',
                    name: 'Aprende en la cocina',
                    navigation: { nav_title: 'Aprendé' },
                    children: [
                        {
                            _id: '/trucos',
                            name: 'Tips y secretos de cocina',
                            navigation: {},
                            children: []
                        }
                    ]
                },
                {
                    _id: '/cocina-facil-y-rapido',
                    name: 'Cocina fácil y rápido',
                    navigation: { nav_title: 'Cociná fácil' },
                    children: [
                        {
                            _id: '/recetas/que-cocinar-hoy/facil',
                            name: 'Recetas fáciles',
                            navigation: {},
                            children: []
                        }
                    ]
                }
            ]
        };

        const result = transformMenuData(input);
        expect(result).toEqual([
            {
                title: 'Aprendé',
                data: [
                    {
                        items: [
                            {
                                text: 'Tips y secretos de cocina',
                                href: 'https://foodit.lanacion.com.ar/trucos/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Cociná fácil',
                data: [
                    {
                        items: [
                            {
                                text: 'Recetas fáciles',
                                href: 'https://foodit.lanacion.com.ar/recetas/que-cocinar-hoy/facil/',
                                menuType: 'primary'
                            }
                        ]
                    }
                ]
            },
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos'
            }
        ]);
    });

    it('should add CLUB LA NACION only on mobile', () => {
        const result = transformMenuData({ children: [], isMobile: true });

        expect(result).toEqual([
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos'
            },
            {
                href: 'https://foodit.lanacion.com.ar/club-la-nacion/',
                menuType: 'secondary',
                title: 'CLUB LA NACION'
            }
        ]);
    });
});
