import React from 'react';
import transformMenuData, {
    RESPONSE_FORMAT,
    sendChatMessage
} from '../../../../../../components/features/foodit-global/common/Header/_helpers';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar',
        API_IA_FOODIT: 'https://foodit-chatbot.test'
    };
});

describe('transformMenuData function', () => {
    it('returns default data when children is an empty array', () => {
        const result = transformMenuData({});
        expect(result).toEqual([
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos',
                className: '--no-app'
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
                title: 'Conocenos',
                className: '--no-app'
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
                title: 'Conocenos',
                className: '--no-app'
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
                title: 'Conocenos',
                className: '--no-app'
            },
            {
                href: 'https://foodit.lanacion.com.ar/club-la-nacion/',
                menuType: 'secondary',
                title: 'CLUB LA NACION',
                className: 'lg-none'
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
                title: 'Conocenos',
                className: '--no-app'
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
                title: 'Conocenos',
                className: '--no-app'
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
                title: 'Conocenos',
                className: '--no-app'
            }
        ]);
    });

    it('should add CLUB LA NACION only on mobile', () => {
        const result = transformMenuData({ children: [], isMobile: true });

        expect(result).toEqual([
            {
                href: 'https://conocenos.foodit.com.ar/',
                menuType: 'secondary',
                title: 'Conocenos',
                className: '--no-app'
            },
            {
                href: 'https://foodit.lanacion.com.ar/club-la-nacion/',
                menuType: 'secondary',
                title: 'CLUB LA NACION',
                className: 'lg-none'
            }
        ]);
    });
});

describe('sendChatMessage', () => {
    const okResponse = (body = {}) => ({
        ok: true,
        status: 200,
        text: async () => JSON.stringify(body)
    });

    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue(okResponse());
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    // Contra la constante y no contra el literal: es la misma que alimenta el render
    it('should ask for the format the chat renders with', async () => {
        await sendChatMessage({
            sessionId: 's-1',
            message: 'hola',
            accessToken: 'jwt',
            userId: 'u-1'
        });

        const body = JSON.parse(global.fetch.mock.calls[0][1].body);
        expect(body.response_type).toBe(RESPONSE_FORMAT);
        expect(RESPONSE_FORMAT).toBe('markdown');
        expect(body).toMatchObject({
            session_id: 's-1',
            message: 'hola',
            user_id: 'u-1'
        });
    });

    it('should send the token in the x-authorization header', async () => {
        await sendChatMessage({ accessToken: 'jwt' });

        const [, options] = global.fetch.mock.calls[0];
        expect(options.headers['x-authorization']).toBe('jwt');
    });

    it('should return the parsed body for a successful response', async () => {
        global.fetch.mockResolvedValue(okResponse({ success: true }));

        await expect(sendChatMessage({ accessToken: 'jwt' })).resolves.toEqual({
            success: true
        });
    });

    it('should log and rethrow when the fetch itself rejects', async () => {
        const networkError = new TypeError('Failed to fetch');
        global.fetch.mockRejectedValue(networkError);

        await expect(sendChatMessage({ accessToken: 'jwt' })).rejects.toBe(
            networkError
        );
        expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('fetch falló'),
            networkError
        );
    });

    it('should log but still return the body when the API answers with an HTTP error', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 401,
            text: async () => JSON.stringify({ error: 'Unauthorized' })
        });

        await expect(sendChatMessage({ accessToken: 'jwt' })).resolves.toEqual({
            error: 'Unauthorized'
        });
        expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('respondió con error'),
            401,
            expect.any(String)
        );
    });

    it('should log and rethrow when the body is not valid JSON', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 504,
            text: async () => '<html>Gateway Timeout</html>'
        });

        await expect(sendChatMessage({ accessToken: 'jwt' })).rejects.toThrow();
        expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('no es JSON válido'),
            504,
            '<html>Gateway Timeout</html>'
        );
    });
});
