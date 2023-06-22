import {
    filterWebStoriesChildren,
    filterWebStoriesRenderables,
    filterWebStories,
    validateChain
} from '../../../../../components/chains/LN10_Caja_WebStories/common/_helper-WebApi';

describe('components - chains -ln10_caja_webstories - common - _helper-webapi', () => {
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
        },
        {
            collection: 'chains',
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
    ];

    const children = [
        { key: '123' },
        { key: '456' },
        { key: '789' },
        { key: '112' }
    ];

    it('should test filterWebStoriesChildren func', () => {
        expect(
            filterWebStoriesChildren(filterWebStories(renderables), children)
        ).toStrictEqual([{ key: '123' }, { key: '789' }]);
    });

    it('should test filterWebStories func', () => {
        expect(filterWebStories(renderables)).toStrictEqual([
            {
                props: {
                    customFields: {
                        imageId: 'image-0',
                        link: 'www.lanacion.com.ar'
                    },
                    id: '123'
                }
            },
            {
                props: {
                    customFields: {
                        imageId: 'image-1',
                        link: 'www.lanacion.com.ar'
                    },
                    id: '789'
                }
            }
        ]);
    });

    it('should test filterWebStoriesRenderables func', () => {
        expect(
            filterWebStoriesRenderables(renderables).toString()
        ).toStrictEqual(
            [
                {
                    collection: 'sections',
                    children: [
                        { children: [], type: 'LN10_Caja_Manual' },
                        {
                            children: [
                                {
                                    props: {
                                        customFields: {
                                            imageId: 'image-0',
                                            link: 'www.lanacion.com.ar'
                                        },
                                        id: '123'
                                    }
                                },
                                {
                                    props: {
                                        customFields: {
                                            link: 'www.lanacion.com.ar'
                                        },
                                        id: '456'
                                    }
                                },
                                {
                                    props: {
                                        customFields: {
                                            imageId: 'image-1',
                                            link: 'www.lanacion.com.ar'
                                        },
                                        id: '789'
                                    }
                                },
                                {
                                    props: {
                                        customFields: { imageId: 'image-1' },
                                        id: '112'
                                    }
                                }
                            ],
                            type: 'LN10_Caja_WebStories'
                        }
                    ]
                },
                {
                    collection: 'chains',
                    type: 'LN10_Caja_WebStories',
                    children: [
                        {
                            props: {
                                customFields: {
                                    imageId: 'image-0',
                                    link: 'www.lanacion.com.ar'
                                },
                                id: '123'
                            }
                        },
                        {
                            props: {
                                customFields: {
                                    imageId: 'image-1',
                                    link: 'www.lanacion.com.ar'
                                },
                                id: '789'
                            }
                        }
                    ]
                }
            ].toString()
        );
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
            validateChain(
                filterWebStoriesChildren(
                    filterWebStories(_renderables),
                    _children
                )
            )
        ).toStrictEqual({
            message:
                'Se requiere ingresar el link / ID de imagen de la webstory',
            type: 'warning'
        });

        expect(
            validateChain(
                filterWebStoriesChildren(
                    filterWebStories(renderables),
                    children
                )
            )
        ).toStrictEqual({
            message: 'Se necesitan al menos 4 webstorys',
            type: 'warning'
        });
    });
});
