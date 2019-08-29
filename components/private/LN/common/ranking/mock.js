const articles = [
    {
        type: 'story',
        version: '0.10.2',
        created_date: '2019-08-26T13:53:18.910Z',
        revision: {
            revision_id: 'LXDJJMMX65DARF4EDW4NJOURFU',
            parent_id: 'AHYVDQ4CG5EM3KAYMPN33H2ASE',
            editions: ['default'],
            branch: 'default',
            user_id: 'giannattasior@washpost.com',
            published: true
        },
        last_updated_date: '2019-08-26T14:16:36.256Z',
        canonical_url: '/baseball/2019/08/26/baseball-game-recap',
        headlines: {
            basic: 'Baseball Game Recap:',
            mobile: '',
            native: '',
            print: '',
            tablet: '',
            web: '',
            meta_title: ''
        },
        owner: {
            sponsored: false,
            id: 'demo'
        },
        content_restrictions: {
            content_code: 'free'
        },
        address: {},
        workflow: {
            status_code: 1
        },
        subheadlines: {
            basic: ''
        },
        description: {
            basic: ''
        },
        language: '',
        source: {
            system: 'ellipsis',
            name: 'demo',
            source_type: 'staff'
        },
        taxonomy: {
            sites: [
                {
                    _id: '/sports/baseball',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Baseball',
                    description: 'Latest baseball scores and stories.',
                    path: '/sports/baseball',
                    parent_id: '/sports',
                    additional_properties: {
                        original: {
                            _id: '/sports/baseball',
                            site: {
                                site_title: 'Baseball',
                                site_url: '/sports/baseball',
                                site_description:
                                    'Latest baseball scores and stories.',
                                site_keywords: 'sports,baseball,world series'
                            },
                            name: 'Baseball',
                            parent: '/sports',
                            ancestors: ['/', '/sports'],
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: 2002,
                            node_type: 'section',
                            inactive: false
                        }
                    }
                },
                {
                    _id: '/sports',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Sports',
                    description: 'Latest scores and sports.',
                    path: '/sports',
                    parent_id: '/',
                    additional_properties: {
                        original: {
                            _id: '/sports',
                            site: {
                                site_title: 'Sports',
                                site_url: '/sports',
                                site_description: 'Latest scores and sports.',
                                site_keywords: 'scores,scoreboard,sports'
                            },
                            name: 'Sports',
                            order: 1017,
                            parent: '/',
                            ancestors: ['/'],
                            inactive: false,
                            node_type: 'section'
                        }
                    }
                }
            ],
            tags: [
                {
                    text: 'baseball',
                    description: 'Tag for baseball stories',
                    slug: 'baseball'
                },
                {
                    text: 'sports',
                    description: 'Generic tag for sports articles',
                    slug: 'sports'
                }
            ],
            primary_site: {
                _id: '/sports/baseball',
                type: 'site',
                version: '0.5.8',
                name: 'Baseball',
                description: 'Latest baseball scores and stories.',
                path: '/sports/baseball',
                parent_id: '/sports',
                additional_properties: {
                    original: {
                        _id: '/sports/baseball',
                        site: {
                            site_title: 'Baseball',
                            site_url: '/sports/baseball',
                            site_description:
                                'Latest baseball scores and stories.',
                            site_keywords: 'sports,baseball,world series'
                        },
                        name: 'Baseball',
                        parent: '/sports',
                        ancestors: ['/', '/sports'],
                        _admin: {
                            alias_ids: ['/sports/baseball']
                        },
                        order: 2002,
                        node_type: 'section',
                        inactive: false
                    }
                }
            },
            seo_keywords: ['baseball', 'sports'],
            sections: [
                {
                    _id: '/sports/baseball',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Baseball',
                    description: 'Latest baseball scores and stories.',
                    path: '/sports/baseball',
                    parent_id: '/sports',
                    parent: {
                        default: '/sports'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports/baseball',
                            site: {
                                site_title: 'Baseball',
                                site_url: '/sports/baseball',
                                site_description:
                                    'Latest baseball scores and stories.',
                                site_keywords: 'sports,baseball,world series'
                            },
                            name: 'Baseball',
                            parent: {
                                default: '/sports',
                                'main-site-navigation': '/sports',
                                'primary-header-links': '/sports',
                                'desktop-navigation': '/sports',
                                'mobile-navigation': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002
                            },
                            node_type: 'section',
                            inactive: false,
                            _website: 'demo'
                        }
                    },
                    _website_section_id: 'demo./sports/baseball'
                },
                {
                    _id: '/sports',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Sports',
                    description: 'Latest scores and sports.',
                    path: '/sports',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports',
                            site: {
                                site_title: 'Sports',
                                site_url: '/sports',
                                site_description: 'Latest scores and sports.',
                                site_keywords: 'scores,scoreboard,sports'
                            },
                            _website: 'demo',
                            name: 'Sports',
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 1003,
                                'desktop-navigation': 1001,
                                default: 1017
                            },
                            parent: {
                                default: '/',
                                'main-site-navigation': '/',
                                'primary-header-links': '/',
                                'footer-test': null,
                                'desktop-navigation': '/'
                            },
                            ancestors: {
                                default: ['/'],
                                'main-site-navigation': [],
                                'primary-header-links': [],
                                'footer-test': [],
                                'desktop-navigation': ['/']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'demo./sports'
                }
            ],
            primary_section: {
                _id: '/sports/baseball',
                _website: 'demo',
                type: 'section',
                version: '0.6.0',
                name: 'Baseball',
                description: 'Latest baseball scores and stories.',
                path: '/sports/baseball',
                parent_id: '/sports',
                parent: {
                    default: '/sports'
                },
                additional_properties: {
                    original: {
                        _id: '/sports/baseball',
                        site: {
                            site_title: 'Baseball',
                            site_url: '/sports/baseball',
                            site_description:
                                'Latest baseball scores and stories.',
                            site_keywords: 'sports,baseball,world series'
                        },
                        name: 'Baseball',
                        parent: {
                            default: '/sports',
                            'main-site-navigation': '/sports',
                            'primary-header-links': '/sports',
                            'desktop-navigation': '/sports',
                            'mobile-navigation': '/'
                        },
                        ancestors: {
                            default: ['/', '/sports'],
                            'main-site-navigation': ['/sports'],
                            'primary-header-links': ['/sports'],
                            'desktop-navigation': ['/', '/sports'],
                            'mobile-navigation': ['/']
                        },
                        _admin: {
                            alias_ids: ['/sports/baseball']
                        },
                        order: {
                            'main-site-navigation': 2002,
                            'primary-header-links': 2002,
                            'desktop-navigation': 2001,
                            'mobile-navigation': 1001,
                            default: 2002
                        },
                        node_type: 'section',
                        inactive: false,
                        _website: 'demo'
                    }
                }
            }
        },
        label: {},
        promo_items: {
            basic: {
                _id: '3C3UZNAAUVBETNQGM5MPTSYJNQ',
                additional_properties: {
                    fullSizeResizeUrl:
                        '/photo/resize/rm_w3hf8SCSpd3NsIFtPDhCxnEs=/arc-anglerfish-arc2-prod-demo/public/3C3UZNAAUVBETNQGM5MPTSYJNQ.jpg',
                    galleries: [],
                    ingestionMethod: 'manual',
                    keywords: [],
                    mime_type: 'image/jpeg',
                    originalName: 'architecture-3121009_1280.jpg',
                    originalUrl:
                        'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/3C3UZNAAUVBETNQGM5MPTSYJNQ.jpg',
                    owner: 'aaron.jansen@washpost.com',
                    proxyUrl:
                        '/photo/resize/rm_w3hf8SCSpd3NsIFtPDhCxnEs=/arc-anglerfish-arc2-prod-demo/public/3C3UZNAAUVBETNQGM5MPTSYJNQ.jpg',
                    published: true,
                    resizeUrl:
                        'http://thumbor-prod-us-east-1.photo.aws.arc.pub/rm_w3hf8SCSpd3NsIFtPDhCxnEs=/arc-anglerfish-arc2-prod-demo/public/3C3UZNAAUVBETNQGM5MPTSYJNQ.jpg',
                    restricted: false,
                    version: 1
                },
                address: {},
                caption: 'this is a caption',
                created_date: '2019-08-22T23:50:12Z',
                credits: {
                    affiliation: []
                },
                height: 720,
                image_type: 'photograph',
                last_updated_date: '2019-08-23T00:00:46Z',
                licensable: false,
                owner: {
                    id: 'demo',
                    sponsored: false
                },
                source: {
                    edit_url:
                        'https://demo.arcpublishing.com/photo/3C3UZNAAUVBETNQGM5MPTSYJNQ',
                    system: 'Anglerfish'
                },
                subtitle: 'bridge',
                taxonomy: {
                    associated_tasks: []
                },
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/3C3UZNAAUVBETNQGM5MPTSYJNQ.jpg',
                version: '0.9.0',
                width: 1280
            }
        },
        distributor: {
            name: 'demo',
            category: 'staff',
            subcategory: ''
        },
        canonical_website: 'demo',
        planning: {
            internal_note: '',
            story_length: {
                word_count_actual: 23,
                line_count_actual: 14,
                inch_count_actual: 2
            }
        },
        display_date: '2019-08-26T14:16:32.972Z',
        credits: {
            by: [
                {
                    _id: 'aaron.jansen',
                    type: 'author',
                    version: '0.5.8',
                    name: 'Aaron Jansen',
                    image: {
                        url: '',
                        version: '0.5.8'
                    },
                    description: '',
                    url: '',
                    slug: '',
                    social_links: [
                        {
                            site: 'email',
                            url: ''
                        }
                    ],
                    socialLinks: [
                        {
                            site: 'email',
                            url: '',
                            deprecated: true,
                            deprecation_msg: 'Please use social_links.'
                        }
                    ],
                    additional_properties: {
                        original: {
                            _id: 'aaron.jansen',
                            firstName: 'Aaron',
                            lastName: 'Jansen',
                            byline: 'Aaron Jansen',
                            image: '',
                            email: '',
                            affiliations: '',
                            beat: 'Arc',
                            education: [],
                            awards: [],
                            books: [],
                            podcasts: [],
                            bio_page: '',
                            bio: '',
                            longBio: '',
                            slug: '',
                            native_app_rendering: false,
                            fuzzy_match: false,
                            contributor: false,
                            status: true,
                            last_updated_date: '2018-07-12T21:07:58.339Z'
                        }
                    }
                }
            ]
        },
        first_publish_date: '2019-08-26T14:16:36.283Z',
        websites: {
            demo: {
                website_section: {
                    _id: '/sports/baseball',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Baseball',
                    description: 'Latest baseball scores and stories.',
                    path: '/sports/baseball',
                    parent_id: '/sports',
                    parent: {
                        default: '/sports'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports/baseball',
                            site: {
                                site_title: 'Baseball',
                                site_url: '/sports/baseball',
                                site_description:
                                    'Latest baseball scores and stories.',
                                site_keywords: 'sports,baseball,world series'
                            },
                            name: 'Baseball',
                            parent: {
                                default: '/sports',
                                'main-site-navigation': '/sports',
                                'primary-header-links': '/sports',
                                'desktop-navigation': '/sports',
                                'mobile-navigation': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002
                            },
                            node_type: 'section',
                            inactive: false,
                            _website: 'demo'
                        }
                    },
                    _website_section_id: 'demo./sports/baseball'
                },
                website_url: '/baseball/2019/08/26/baseball-game-recap'
            }
        },
        additional_properties: {
            clipboard: {},
            has_published_copy: true,
            is_published: false,
            publish_date: false
        },
        publish_date: '2019-08-26T14:16:36.283Z',
        publishing: {
            scheduled_operations: {
                publish_edition: [],
                unpublish_edition: []
            }
        },
        _id: 'VA2TVD2G3JA65DA2LUWLKNDT2Y',
        website: 'demo',
        website_url: '/baseball/2019/08/26/baseball-game-recap'
    },
    {
        type: 'story',
        version: '0.10.2',
        created_date: '2019-07-31T20:39:11.698Z',
        revision: {
            revision_id: '7OTATIAGKVGMLDMMSVIF7XAJH4',
            parent_id: 'Q3VEE4KCXJDCDJD2YX4Y2BCHR4',
            editions: ['default'],
            branch: 'default',
            user_id: 'giannattasior@washpost.com',
            published: true
        },
        last_updated_date: '2019-08-26T04:45:48.426Z',
        canonical_url: '/brands/2019/07/31/cream-of-broccoli-soup-recipe',
        headlines: {
            basic: 'Cream of Broccoli Soup Recipe',
            mobile: '',
            native: '',
            print: '',
            tablet: '',
            web: '',
            meta_title: ''
        },
        owner: {
            sponsored: false,
            id: 'demo'
        },
        content_restrictions: {
            content_code: 'free'
        },
        address: {},
        workflow: {
            status_code: 2,
            note: ''
        },
        subheadlines: {
            basic: 'A delicious summertime recipe'
        },
        description: {
            basic: 'Content by brands for readers.'
        },
        language: '',
        source: {
            system: 'ellipsis',
            name: 'demo',
            source_type: 'staff'
        },
        label: {},
        taxonomy: {
            sites: [
                {
                    _id: '/brands',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Brands',
                    description: 'Brands',
                    path: '/brands',
                    additional_properties: {
                        original: {
                            _id: '/brands',
                            Ads: {
                                dfp_id: null
                            },
                            site: {
                                site_keywords:
                                    'brands, branded content, content',
                                site_description: 'Brands',
                                site_url:
                                    'http://demo.arcpublishing.com/brands',
                                site_title: 'Brands'
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            default: {
                                test: 'http://demo.arcpublishing.com/brands'
                            },
                            name: 'Brands',
                            _admin: {
                                alias_ids: ['/brands']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    }
                },
                {
                    _id: '/food',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'demo.arcpublishing.com/pb/food',
                                site_title: 'Food',
                                site_description: 'Food',
                                site_keywords: 'food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            copyright: '2018 (c) Arc Publishing',
                            name: 'Food',
                            order: 1015,
                            parent: '/',
                            inactive: false,
                            node_type: 'section'
                        }
                    }
                }
            ],
            tags: [
                {
                    text: 'brand',
                    description: 'brand',
                    slug: 'brand'
                },
                {
                    text: 'company',
                    description: 'company',
                    slug: 'company'
                },
                {
                    text: 'evergreen',
                    description: 'evergreen',
                    slug: 'evergreen'
                },
                {
                    text: 'email',
                    description: 'email',
                    slug: 'email'
                },
                {
                    text: 'DMP',
                    description: 'DMP',
                    slug: 'dmp'
                }
            ],
            sections: [
                {
                    _id: '/brands',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Brands',
                    description: 'Brands',
                    path: '/brands',
                    additional_properties: {
                        original: {
                            _id: '/brands',
                            Ads: {
                                dfp_id: null
                            },
                            site: {
                                site_keywords:
                                    'brands, branded content, content',
                                site_description: 'Brands',
                                site_url:
                                    'http://demo.arcpublishing.com/brands',
                                site_title: 'Brands'
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            default: {
                                test: 'http://demo.arcpublishing.com/brands'
                            },
                            name: 'Brands',
                            _website: 'demo',
                            parent: {
                                default: null
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/brands']
                            },
                            inactive: false,
                            node_type: 'section',
                            order: {}
                        }
                    },
                    _website_section_id: 'demo./brands'
                },
                {
                    _id: '/food',
                    _website: 'east-coast-herald',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'eastcoastherald.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'east-coast-herald',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'east-coast-herald./food'
                },
                {
                    _id: '/food',
                    _website: 'the-gazette',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'thegazette.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-gazette',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-gazette./food'
                },
                {
                    _id: '/food',
                    _website: 'the-mirror',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'themirror.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-mirror',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-mirror./food'
                },
                {
                    _id: '/food',
                    _website: 'the-globe',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'theglobe.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-globe',
                            parent: {
                                default: '/',
                                footer: '/'
                            },
                            ancestors: {
                                default: [],
                                footer: ['/']
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section',
                            order: {
                                footer: 1001
                            }
                        }
                    },
                    _website_section_id: 'the-globe./food'
                },
                {
                    _id: '/food',
                    _website: 'the-bugle',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'thebugle.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-bugle',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-bugle./food'
                },
                {
                    _id: '/food',
                    _website: 'the-telegraph',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'thetelegraph.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-telegraph',
                            parent: {
                                default: '/',
                                'main-site-navigation': '/'
                            },
                            ancestors: {
                                default: [],
                                'main-site-navigation': ['/']
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section',
                            order: {
                                'main-site-navigation': 1001
                            }
                        }
                    },
                    _website_section_id: 'the-telegraph./food'
                },
                {
                    _id: '/food',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'demo.arcpublishing.com/pb/food',
                                site_title: 'Food',
                                site_description: 'Food',
                                site_keywords: 'food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            copyright: '2018 (c) Arc Publishing',
                            _website: 'demo',
                            name: 'Food',
                            order: {
                                default: 1015
                            },
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'demo./food'
                },
                {
                    _id: '/food',
                    _website: 'the-prophet',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'theprophet.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-prophet',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section',
                            order: {
                                default: 1002
                            }
                        }
                    },
                    _website_section_id: 'the-prophet./food'
                },
                {
                    _id: '/food',
                    _website: 'the-mercury',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'themercury.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-mercury',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-mercury./food'
                },
                {
                    _id: '/food',
                    _website: 'the-planet',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'theplanet.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-planet',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-planet./food'
                },
                {
                    _id: '/food',
                    _website: 'west-coast-sun',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'westcoastsun.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'west-coast-sun',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'west-coast-sun./food'
                }
            ],
            primary_site: {
                _id: '/brands',
                type: 'site',
                version: '0.5.8',
                name: 'Brands',
                description: 'Brands',
                path: '/brands',
                additional_properties: {
                    original: {
                        _id: '/brands',
                        Ads: {
                            dfp_id: null
                        },
                        site: {
                            site_keywords: 'brands, branded content, content',
                            site_description: 'Brands',
                            site_url: 'http://demo.arcpublishing.com/brands',
                            site_title: 'Brands'
                        },
                        logo: {
                            logo: null,
                            logo_align: 'left',
                            logo_url: null,
                            logo_text: null,
                            logo_sticky: null
                        },
                        default: {
                            test: 'http://demo.arcpublishing.com/brands'
                        },
                        name: 'Brands',
                        _admin: {
                            alias_ids: ['/brands']
                        },
                        inactive: false,
                        node_type: 'section'
                    }
                }
            },
            primary_section: {
                _id: '/brands',
                _website: 'demo',
                type: 'section',
                version: '0.6.0',
                name: 'Brands',
                description: 'Brands',
                path: '/brands',
                additional_properties: {
                    original: {
                        _id: '/brands',
                        Ads: {
                            dfp_id: null
                        },
                        site: {
                            site_keywords: 'brands, branded content, content',
                            site_description: 'Brands',
                            site_url: 'http://demo.arcpublishing.com/brands',
                            site_title: 'Brands'
                        },
                        logo: {
                            logo: null,
                            logo_align: 'left',
                            logo_url: null,
                            logo_text: null,
                            logo_sticky: null
                        },
                        default: {
                            test: 'http://demo.arcpublishing.com/brands'
                        },
                        name: 'Brands',
                        _website: 'demo',
                        parent: {
                            default: null
                        },
                        ancestors: {
                            default: []
                        },
                        _admin: {
                            alias_ids: ['/brands']
                        },
                        inactive: false,
                        node_type: 'section',
                        order: {}
                    }
                }
            },
            seo_keywords: [
                'brand',
                'content',
                'marketing',
                'brand category',
                'recipe',
                'DIY tips',
                'travel destinations'
            ]
        },
        promo_items: {
            html: {
                content: 'http://www.slimjim.com/',
                _id: 'Q5ESU6HC3JDVVNFK3E7L6TQEYA',
                type: 'raw_html'
            }
        },
        distributor: {
            name: 'demo',
            category: 'staff',
            subcategory: ''
        },
        canonical_website: 'demo',
        planning: {
            scheduling: {
                planned_publish_date: '2019-08-01T11:00:49Z',
                will_have_image: true,
                will_have_video: true
            },
            internal_note: '',
            story_length: {
                word_count_actual: 29,
                line_count_actual: 18,
                inch_count_actual: 3
            }
        },
        display_date: '2019-07-31T20:47:19.443Z',
        credits: {
            by: []
        },
        first_publish_date: '2019-07-31T20:47:20.642Z',
        websites: {
            demo: {
                website_section: {
                    _id: '/brands',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Brands',
                    description: 'Brands',
                    path: '/brands',
                    additional_properties: {
                        original: {
                            _id: '/brands',
                            Ads: {
                                dfp_id: null
                            },
                            site: {
                                site_keywords:
                                    'brands, branded content, content',
                                site_description: 'Brands',
                                site_url:
                                    'http://demo.arcpublishing.com/brands',
                                site_title: 'Brands'
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            default: {
                                test: 'http://demo.arcpublishing.com/brands'
                            },
                            name: 'Brands',
                            _website: 'demo',
                            parent: {
                                default: null
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/brands']
                            },
                            inactive: false,
                            node_type: 'section',
                            order: {}
                        }
                    },
                    _website_section_id: 'demo./brands'
                },
                website_url: '/brands/2019/07/31/cream-of-broccoli-soup-recipe'
            },
            'east-coast-herald': {
                website_section: {
                    _id: '/food',
                    _website: 'east-coast-herald',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'eastcoastherald.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'east-coast-herald',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'east-coast-herald./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'the-gazette': {
                website_section: {
                    _id: '/food',
                    _website: 'the-gazette',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'thegazette.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-gazette',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-gazette./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'the-mirror': {
                website_section: {
                    _id: '/food',
                    _website: 'the-mirror',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'themirror.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-mirror',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-mirror./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'the-globe': {
                website_section: {
                    _id: '/food',
                    _website: 'the-globe',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'theglobe.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-globe',
                            parent: {
                                default: '/',
                                footer: '/'
                            },
                            ancestors: {
                                default: [],
                                footer: ['/']
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section',
                            order: {
                                footer: 1001
                            }
                        }
                    },
                    _website_section_id: 'the-globe./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'the-bugle': {
                website_section: {
                    _id: '/food',
                    _website: 'the-bugle',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'thebugle.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-bugle',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-bugle./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'the-telegraph': {
                website_section: {
                    _id: '/food',
                    _website: 'the-telegraph',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'thetelegraph.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-telegraph',
                            parent: {
                                default: '/',
                                'main-site-navigation': '/'
                            },
                            ancestors: {
                                default: [],
                                'main-site-navigation': ['/']
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section',
                            order: {
                                'main-site-navigation': 1001
                            }
                        }
                    },
                    _website_section_id: 'the-telegraph./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'the-prophet': {
                website_section: {
                    _id: '/food',
                    _website: 'the-prophet',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'theprophet.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-prophet',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section',
                            order: {
                                default: 1002
                            }
                        }
                    },
                    _website_section_id: 'the-prophet./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'the-mercury': {
                website_section: {
                    _id: '/food',
                    _website: 'the-mercury',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'themercury.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-mercury',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-mercury./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'the-planet': {
                website_section: {
                    _id: '/food',
                    _website: 'the-planet',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'theplanet.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'the-planet',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'the-planet./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            },
            'west-coast-sun': {
                website_section: {
                    _id: '/food',
                    _website: 'west-coast-sun',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Food',
                    description: 'Food',
                    path: '/food',
                    parent_id: '/',
                    parent: {
                        default: '/'
                    },
                    additional_properties: {
                        original: {
                            _id: '/food',
                            site: {
                                site_url: 'westcoastsun.com/food',
                                site_description: 'Food',
                                site_keywords: 'Food',
                                site_title: 'Food'
                            },
                            Ads: {
                                dfp_id: null
                            },
                            logo: {
                                logo: null,
                                logo_align: 'left',
                                logo_url: null,
                                logo_text: null,
                                logo_sticky: null
                            },
                            name: 'Food',
                            _website: 'west-coast-sun',
                            parent: {
                                default: '/'
                            },
                            ancestors: {
                                default: []
                            },
                            _admin: {
                                alias_ids: ['/food']
                            },
                            inactive: false,
                            node_type: 'section'
                        }
                    },
                    _website_section_id: 'west-coast-sun./food'
                },
                website_url: '/2019/07/31/cream-of-broccoli-soup-recipe/'
            }
        },
        additional_properties: {
            clipboard: {},
            has_published_copy: true,
            is_published: true,
            publish_date: '2019-07-31T20:47:20.642Z'
        },
        publish_date: '2019-08-26T04:45:48.462Z',
        publishing: {
            scheduled_operations: {
                publish_edition: [],
                unpublish_edition: []
            }
        },
        _id: 'GDZ4ZV625ZAA7B6AOAZTTMHUM4',
        website: 'demo',
        website_url: '/brands/2019/07/31/cream-of-broccoli-soup-recipe'
    }
];

export default articles;
