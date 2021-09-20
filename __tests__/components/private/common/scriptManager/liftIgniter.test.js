import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import get from '../../../../../components/private/common/utils/get';
import getAuthorByline from '../../../../../components/private/common/utils/getAuthorByline';

import LiftIgniter from '../../../../../components/private/common/scriptManager/Liftigniter';

const globalContentMock = {
    _id: 'IIEEJBWQWNCZNDOUTKP47C4L24',
    content_elements: [
        {
            _id: 'FMKASEOIXNARVBBZ4BHCOAWU5A',
            additional_properties: {},
            content:
                'Hola amigos, soy el primer " parrafo " y tengo una palabra con comillas.',
            type: 'text'
        },
        {
            _id: 'MLEXR5KM3NBOXAJSG5FUFENLLQ',
            additional_properties: {},
            content:
                'hola que tal como te va, <a href="https://www.youtube.com/" target="_blank">no se que decirrr</a>. vos donde estas.',
            type: 'text'
        }
    ],
    credits: {
        by: [
            {
                _id: 'carlos-pagni-81',
                additional_properties: {
                    original: {
                        author_type: 'Estándar',
                        bio_page: '/autor/carlos-pagni-81/',
                        byline: 'Carlos Pagni',
                        image:
                            'https://resizer.glanacion.com/resizer/PNjDoOm_Gkxjqpjax5_jKzkLX6k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png',
                        role: 'LA NACION'
                    }
                },
                image: {
                    resized_urls: [
                        {
                            option: {
                                height: 80,
                                media: '(min-width: 320px)',
                                width: 80
                            },
                            resizedUrl:
                                'https://resizer.glanacion.com/resizer/PNjDoOm_Gkxjqpjax5_jKzkLX6k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
                        }
                    ],
                    url:
                        'https://bucket.glanacion.com/anexos/fotos/91/2219591.png'
                },
                name: 'Carlos Pagni',
                slug: 'carlos-pagni-81',
                type: 'author',
                url: '/autor/carlos-pagni-81/'
            }
        ]
    },
    headlines: {
        basic: 'Última prueba syndication 3...',
        meta_title: '',
        mobile: 'ult mob'
    },
    label: {
        chapita: {
            display: true,
            text: 'chapita desde composer'
        },
        edicion: {
            display: true,
            text: 'Impresa'
        },
        mostrar_banners: {
            display: true,
            text: 'Si',
            url: ''
        },
        recomendar: {
            display: true,
            text: 'No',
            url: ''
        },
        trust: {
            text: 'Noticia Original'
        },
        volanta: {
            display: true,
            text: 'volanta desde composer'
        }
    },
    subheadlines: {
        basic: ''
    },
    taxonomy: {
        primary_section: {
            _id: '/economia/industria',
            _website: 'la-nacion-ar',
            additional_properties: {
                original: {
                    ancestors: {},
                    migration: {
                        id_section_ln9: '8002',
                        migrated_mob: 'false'
                    }
                }
            },
            name: 'Industria',
            parent_id: '/economia',
            path: '/economia/industria',
            type: 'section'
        },
        sections: [
            {
                _id: '/economia/industria',
                _website: 'la-nacion-ar',
                additional_properties: {
                    original: {
                        ancestors: {},
                        migration: {
                            id_section_ln9: '8002',
                            migrated_mob: 'false'
                        }
                    }
                },
                name: 'Industria',
                parent_id: '/economia',
                path: '/economia/industria',
                type: 'section'
            },
            {
                _id: '/economia',
                _website: 'la-nacion-ar',
                additional_properties: {
                    original: {
                        ancestors: {},
                        migration: {
                            id_section_ln9: '272',
                            migrated_mob: 'false'
                        },
                        style: {}
                    }
                },
                name: 'Economía',
                parent_id: '/',
                path: '/economia',
                type: 'section'
            },
            {
                _id: '/revista-jardin',
                _website: 'la-nacion-ar',
                additional_properties: {
                    original: {
                        ancestors: {},
                        migration: {
                            id_section_ln9: '7353',
                            migrated_mob: 'true'
                        },
                        style: {
                            section_style_name: 'jardin'
                        }
                    }
                },
                name: 'Revista Jardín',
                parent_id: '/',
                path: '/revista-jardin',
                type: 'section'
            }
        ],
        sites: [
            {
                additional_properties: {
                    original: {
                        _id: '/economia/industria',
                        migration: {
                            id_section_ln9: '8002',
                            migrated_mob: 'false'
                        }
                    }
                }
            },
            {
                additional_properties: {
                    original: {
                        _id: '/economia',
                        migration: {
                            id_section_ln9: '272',
                            migrated_mob: 'false'
                        }
                    }
                }
            },
            {
                additional_properties: {
                    original: {
                        _id: '/revista-jardin',
                        migration: {
                            id_section_ln9: '7353',
                            migrated_mob: 'true'
                        }
                    }
                }
            }
        ],
        tags: [
            {
                description: 'un tag de prueba nuevo',
                slug: 'pruebadenuevotag',
                text: 'pruebaNuevoTag'
            },
            {
                description: 'Crónicas',
                slug: 'cronicas-tid61570',
                text: 'Crónicas'
            },
            {
                description: 'Reformas del Gobierno',
                slug: 'reformas-del-gobierno-tid62064',
                text: 'Reformas del Gobierno'
            }
        ]
    }
};

describe('Liftigniter', () => {
    const script = {
        defer: true,
        id: 'liftigniter-metadata',
        type: 'application/json',
        dangerouslySetInnerHTML: {
            __html:
                '{"id":"IIEEJBWQWNCZNDOUTKP47C4L24","titleLong":"Última prueba syndication 3...","titleShort":"ult mob","leadText":"volanta desde composer","noShow":true,"noIndex":false,"tematica":"Industria","tags":["pruebaNuevoTag","Crónicas","Reformas del Gobierno"],"autor":"Carlos Pagni"}'
        }
    };

    it('es una funsion', () => {
        const wrapper = shallow(
            <LiftIgniter
                globalContent={globalContentMock}
                location="body-top"
            />
        );
        // const component = mount(<LiftIgniter globalContent={globalContentMock} location="body-top" />)
        console.log(
            'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            wrapper
                .find('script')
                .last()
                .props()
        );
        expect(
            wrapper
                .find('script')
                .last()
                .props()
        ).toEqual(script);
    });
});
