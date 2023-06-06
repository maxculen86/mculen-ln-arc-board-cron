import {
    filterWebStoriesChildren,
    validateChain
} from '../../../../../components/chains/LN10_Caja_WebStories/common/_helper-WebApi';

describe('components - chains -ln10_caja_webstories - common - _helper-webapi', () => {
    it('should return an array if there is no matching children', () => {
        const renderables = [
            {
                collection: 'sections',
                children: [
                    {
                        type: 'LN10_Caja_Manual',
                        children: []
                    },
                    {
                        type: 'LN10_Caja_WebStories',
                        children: []
                    }
                ]
            }
        ];

        const children = [{ children: [] }];

        expect(filterWebStoriesChildren(renderables, children)).toStrictEqual(
            []
        );
    });

    it('should return correct children', () => {
        const renderables = [
            {
                collection: 'sections',
                children: [
                    {
                        type: 'LN10_Caja_Manual',
                        children: []
                    },
                    {
                        type: 'LN10_Caja_WebStories',
                        children: [
                            {
                                props: {
                                    id: '123',
                                    customFields: {
                                        link: 'www.lanacion.com.ar',
                                        imageId: 'image-0'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '456',
                                    customFields: {
                                        link: 'www.lanacion.com.ar'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '789',
                                    customFields: {
                                        link: 'www.lanacion.com.ar',
                                        imageId: 'image-1'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '112',
                                    customFields: {
                                        imageId: 'image-1'
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ];

        const children = [
            { key: '123' },
            { key: '456' },
            { key: '789' },
            { key: '112' }
        ];

        expect(filterWebStoriesChildren(renderables, children)).toStrictEqual([
            { key: '123' },
            { key: '789' }
        ]);
    });

    it('should test validateChain func', () => {
        const renderables = [
            {
                collection: 'sections',
                children: [
                    {
                        type: 'LN10_Caja_Manual',
                        children: []
                    },
                    {
                        type: 'LN10_Caja_WebStories',
                        children: [
                            {
                                props: {
                                    id: '123',
                                    customFields: {
                                        link: 'www.lanacion.com.ar',
                                        imageId: 'image-0'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '456',
                                    customFields: {
                                        link: 'www.lanacion.com.ar'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '789',
                                    customFields: {
                                        link: 'www.lanacion.com.ar',
                                        imageId: 'image-1'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '112',
                                    customFields: {
                                        imageId: 'image-1'
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ];

        const children = [
            { key: '123' },
            { key: '456' },
            { key: '789' },
            { key: '112' }
        ];

        const _renderables = [
            {
                collection: 'sections',
                children: [
                    {
                        type: 'LN10_Caja_WebStories',
                        children: [
                            {
                                props: {
                                    id: '123',
                                    customFields: {
                                        link: 'www.lanacion.com.ar',
                                        imageId: 'image-0'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '456',
                                    customFields: {
                                        link: 'www.lanacion.com.ar',
                                        imageId: 'image-0'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '789',
                                    customFields: {
                                        link: 'www.lanacion.com.ar',
                                        imageId: 'image-1'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '112',
                                    customFields: {
                                        link: 'www.lanacion.com.ar',
                                        imageId: 'image-1'
                                    }
                                }
                            },
                            {
                                props: {
                                    id: '113',
                                    customFields: {
                                        link: 'www.lanacion.com.ar'
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ];
        const _children = [
            { key: '123' },
            { key: '456' },
            { key: '789' },
            { key: '112' },
            { key: '113' }
        ];

        expect(
            validateChain(filterWebStoriesChildren(_renderables, _children))
        ).toStrictEqual({
            message:
                'Se requiere ingresar el link / ID de imagen de la webstory',
            type: 'warning'
        });

        expect(
            validateChain(filterWebStoriesChildren(renderables, children))
        ).toStrictEqual({
            message: 'Se necesitan al menos 4 webstorys',
            type: 'warning'
        });
    });
});
