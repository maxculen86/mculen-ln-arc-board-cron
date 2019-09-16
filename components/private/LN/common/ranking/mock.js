const articles = [
    {
        type: 'story',
        version: '0.10.2',
        created_date: '2019-09-04T18:14:08.966Z',
        revision: {
            revision_id: 'GOYWGIMDWBEJVASZAJ77KONPPA',
            parent_id: 'VCGQOGZZINGYNG5PEPCH2L72JI',
            editions: ['default'],
            branch: 'default',
            user_id: 'jansena@washpost.com',
            published: true
        },
        last_updated_date: '2019-09-10T18:21:12.501Z',
        canonical_url: '/baseball/2019/09/04/baseball-game-recap',
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
                },
                {
                    _id: '/sports/basketball',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: '/sports',
                            ancestors: ['/', '/sports'],
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: 1019,
                            node_type: 'section',
                            children: []
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
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
                },
                {
                    _id: '/sports/basketball',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    parent: {
                        default: '/sports'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: {
                                default: '/sports',
                                'main-site-navigation': '/sports',
                                'primary-header-links': '/sports',
                                'desktop-navigation': '/sports'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports']
                            },
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: {
                                'main-site-navigation': 2003,
                                'primary-header-links': 2001,
                                default: 1019,
                                'desktop-navigation': 2002
                            },
                            _website: 'demo',
                            node_type: 'section',
                            children: []
                        }
                    },
                    _website_section_id: 'demo./sports/basketball'
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
                            'mobile-navigation': '/',
                            'footer-test': '/'
                        },
                        ancestors: {
                            default: ['/', '/sports'],
                            'main-site-navigation': ['/sports'],
                            'primary-header-links': ['/sports'],
                            'desktop-navigation': ['/', '/sports'],
                            'mobile-navigation': ['/'],
                            'footer-test': ['/']
                        },
                        _admin: {
                            alias_ids: ['/sports/baseball']
                        },
                        order: {
                            'main-site-navigation': 2002,
                            'primary-header-links': 2002,
                            'desktop-navigation': 2001,
                            'mobile-navigation': 1001,
                            default: 2002,
                            'footer-test': 1001
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
                _id: 'BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                additional_properties: {
                    fullSizeResizeUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    galleries: [
                        {
                            headlines: {
                                basic: 'test'
                            },
                            _id: 'NXOYDFRY7VAULGKBRTXVSCC5R4'
                        }
                    ],
                    ingestionMethod: 'manual',
                    keywords: [],
                    mime_type: 'image/jpeg',
                    originalName: 'architecture-3121009_1280.jpg',
                    originalUrl:
                        'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    owner: 'aaron.jansen@washpost.com',
                    proxyUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    published: true,
                    resizeUrl:
                        'http://thumbor-prod-us-east-1.photo.aws.arc.pub/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    restricted: false,
                    version: 4
                },
                address: {},
                caption: 'this is a caption',
                created_date: '2019-09-10T11:34:15Z',
                credits: {
                    by: []
                },
                geo: {},
                height: 720,
                image_type: 'photograph',
                last_updated_date: '2019-09-10T17:20:41Z',
                licensable: false,
                owner: {
                    id: 'demo',
                    sponsored: false
                },
                source: {
                    edit_url:
                        'https://demo.arcpublishing.com/photo/BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                    system: 'Anglerfish'
                },
                subtitle: 'bridge',
                taxonomy: {
                    associated_tasks: []
                },
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                version: '0.9.0',
                width: 960
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
                word_count_actual: 25,
                line_count_actual: 20,
                inch_count_actual: 3
            }
        },
        display_date: '2019-09-04T18:17:43.046Z',
        credits: {
            by: [
                {
                    _id: 'alexremington',
                    type: 'author',
                    version: '0.5.8',
                    name: 'Alex Remington',
                    org: 'Washington, DC',
                    image: {
                        url:
                            'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                        version: '0.5.8'
                    },
                    description:
                        'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                    url: '',
                    slug: '',
                    social_links: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com'
                        }
                    ],
                    socialLinks: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com',
                            deprecated: true,
                            deprecation_msg: 'Please use social_links.'
                        }
                    ],
                    additional_properties: {
                        original: {
                            _id: 'alexremington',
                            firstName: 'Alex',
                            lastName: 'Remington',
                            byline: 'Alex Remington',
                            role: 'Enterprise Account Executive',
                            image:
                                'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                            email: 'alexander.remington@washpost.com',
                            affiliations: '',
                            languages: 'English',
                            beat: 'Arc',
                            author_type: 'Staff',
                            education: [],
                            awards: [],
                            books: [],
                            podcasts: [],
                            bio_page: '',
                            location: 'Washington, DC',
                            bio:
                                'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                            longBio: '',
                            slug: '',
                            native_app_rendering: false,
                            fuzzy_match: false,
                            contributor: false,
                            status: true,
                            last_updated: '2018-02-16T14:36:06.520Z',
                            middleName: 'F.',
                            expertise: 'Arc Publishing',
                            last_updated_date: '2019-04-17T15:13:36.104Z'
                        }
                    }
                }
            ]
        },
        first_publish_date: '2019-09-04T18:17:44.675Z',
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
                            },
                            node_type: 'section',
                            inactive: false,
                            _website: 'demo'
                        }
                    },
                    _website_section_id: 'demo./sports/baseball'
                },
                website_url: '/baseball/2019/09/04/baseball-game-recap'
            }
        },
        additional_properties: {
            clipboard: {},
            has_published_copy: true,
            is_published: true,
            publish_date: '2019-09-04T18:17:44.675Z'
        },
        publish_date: '2019-09-10T18:21:12.543Z',
        publishing: {
            scheduled_operations: {
                publish_edition: [],
                unpublish_edition: []
            }
        },
        _id: 'XWEH72X4X5AOBHZQACTDKFAXAY',
        website: 'demo',
        website_url: '/baseball/2019/09/04/baseball-game-recap'
    },
    {
        type: 'story',
        version: '0.10.2',
        created_date: '2019-09-04T18:14:08.966Z',
        revision: {
            revision_id: 'GOYWGIMDWBEJVASZAJ77KONPPA',
            parent_id: 'VCGQOGZZINGYNG5PEPCH2L72JI',
            editions: ['default'],
            branch: 'default',
            user_id: 'jansena@washpost.com',
            published: true
        },
        last_updated_date: '2019-09-10T18:21:12.501Z',
        canonical_url: '/baseball/2019/09/04/baseball-game-recap',
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
                },
                {
                    _id: '/sports/basketball',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: '/sports',
                            ancestors: ['/', '/sports'],
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: 1019,
                            node_type: 'section',
                            children: []
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
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
                },
                {
                    _id: '/sports/basketball',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    parent: {
                        default: '/sports'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: {
                                default: '/sports',
                                'main-site-navigation': '/sports',
                                'primary-header-links': '/sports',
                                'desktop-navigation': '/sports'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports']
                            },
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: {
                                'main-site-navigation': 2003,
                                'primary-header-links': 2001,
                                default: 1019,
                                'desktop-navigation': 2002
                            },
                            _website: 'demo',
                            node_type: 'section',
                            children: []
                        }
                    },
                    _website_section_id: 'demo./sports/basketball'
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
                            'mobile-navigation': '/',
                            'footer-test': '/'
                        },
                        ancestors: {
                            default: ['/', '/sports'],
                            'main-site-navigation': ['/sports'],
                            'primary-header-links': ['/sports'],
                            'desktop-navigation': ['/', '/sports'],
                            'mobile-navigation': ['/'],
                            'footer-test': ['/']
                        },
                        _admin: {
                            alias_ids: ['/sports/baseball']
                        },
                        order: {
                            'main-site-navigation': 2002,
                            'primary-header-links': 2002,
                            'desktop-navigation': 2001,
                            'mobile-navigation': 1001,
                            default: 2002,
                            'footer-test': 1001
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
                _id: 'BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                additional_properties: {
                    fullSizeResizeUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    galleries: [
                        {
                            headlines: {
                                basic: 'test'
                            },
                            _id: 'NXOYDFRY7VAULGKBRTXVSCC5R4'
                        }
                    ],
                    ingestionMethod: 'manual',
                    keywords: [],
                    mime_type: 'image/jpeg',
                    originalName: 'architecture-3121009_1280.jpg',
                    originalUrl:
                        'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    owner: 'aaron.jansen@washpost.com',
                    proxyUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    published: true,
                    resizeUrl:
                        'http://thumbor-prod-us-east-1.photo.aws.arc.pub/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    restricted: false,
                    version: 4
                },
                address: {},
                caption: 'this is a caption',
                created_date: '2019-09-10T11:34:15Z',
                credits: {
                    by: []
                },
                geo: {},
                height: 720,
                image_type: 'photograph',
                last_updated_date: '2019-09-10T17:20:41Z',
                licensable: false,
                owner: {
                    id: 'demo',
                    sponsored: false
                },
                source: {
                    edit_url:
                        'https://demo.arcpublishing.com/photo/BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                    system: 'Anglerfish'
                },
                subtitle: 'bridge',
                taxonomy: {
                    associated_tasks: []
                },
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                version: '0.9.0',
                width: 960
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
                word_count_actual: 25,
                line_count_actual: 20,
                inch_count_actual: 3
            }
        },
        display_date: '2019-09-04T18:17:43.046Z',
        credits: {
            by: [
                {
                    _id: 'alexremington',
                    type: 'author',
                    version: '0.5.8',
                    name: 'Alex Remington',
                    org: 'Washington, DC',
                    image: {
                        url:
                            'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                        version: '0.5.8'
                    },
                    description:
                        'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                    url: '',
                    slug: '',
                    social_links: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com'
                        }
                    ],
                    socialLinks: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com',
                            deprecated: true,
                            deprecation_msg: 'Please use social_links.'
                        }
                    ],
                    additional_properties: {
                        original: {
                            _id: 'alexremington',
                            firstName: 'Alex',
                            lastName: 'Remington',
                            byline: 'Alex Remington',
                            role: 'Enterprise Account Executive',
                            image:
                                'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                            email: 'alexander.remington@washpost.com',
                            affiliations: '',
                            languages: 'English',
                            beat: 'Arc',
                            author_type: 'Staff',
                            education: [],
                            awards: [],
                            books: [],
                            podcasts: [],
                            bio_page: '',
                            location: 'Washington, DC',
                            bio:
                                'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                            longBio: '',
                            slug: '',
                            native_app_rendering: false,
                            fuzzy_match: false,
                            contributor: false,
                            status: true,
                            last_updated: '2018-02-16T14:36:06.520Z',
                            middleName: 'F.',
                            expertise: 'Arc Publishing',
                            last_updated_date: '2019-04-17T15:13:36.104Z'
                        }
                    }
                }
            ]
        },
        first_publish_date: '2019-09-04T18:17:44.675Z',
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
                            },
                            node_type: 'section',
                            inactive: false,
                            _website: 'demo'
                        }
                    },
                    _website_section_id: 'demo./sports/baseball'
                },
                website_url: '/baseball/2019/09/04/baseball-game-recap'
            }
        },
        additional_properties: {
            clipboard: {},
            has_published_copy: true,
            is_published: true,
            publish_date: '2019-09-04T18:17:44.675Z'
        },
        publish_date: '2019-09-10T18:21:12.543Z',
        publishing: {
            scheduled_operations: {
                publish_edition: [],
                unpublish_edition: []
            }
        },
        _id: 'XWEH72X4X5AOBHZQACTDKFAXAY',
        website: 'demo',
        website_url: '/baseball/2019/09/04/baseball-game-recap'
    },
    {
        type: 'story',
        version: '0.10.2',
        created_date: '2019-09-04T18:14:08.966Z',
        revision: {
            revision_id: 'GOYWGIMDWBEJVASZAJ77KONPPA',
            parent_id: 'VCGQOGZZINGYNG5PEPCH2L72JI',
            editions: ['default'],
            branch: 'default',
            user_id: 'jansena@washpost.com',
            published: true
        },
        last_updated_date: '2019-09-10T18:21:12.501Z',
        canonical_url: '/baseball/2019/09/04/baseball-game-recap',
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
                },
                {
                    _id: '/sports/basketball',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: '/sports',
                            ancestors: ['/', '/sports'],
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: 1019,
                            node_type: 'section',
                            children: []
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
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
                },
                {
                    _id: '/sports/basketball',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    parent: {
                        default: '/sports'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: {
                                default: '/sports',
                                'main-site-navigation': '/sports',
                                'primary-header-links': '/sports',
                                'desktop-navigation': '/sports'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports']
                            },
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: {
                                'main-site-navigation': 2003,
                                'primary-header-links': 2001,
                                default: 1019,
                                'desktop-navigation': 2002
                            },
                            _website: 'demo',
                            node_type: 'section',
                            children: []
                        }
                    },
                    _website_section_id: 'demo./sports/basketball'
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
                            'mobile-navigation': '/',
                            'footer-test': '/'
                        },
                        ancestors: {
                            default: ['/', '/sports'],
                            'main-site-navigation': ['/sports'],
                            'primary-header-links': ['/sports'],
                            'desktop-navigation': ['/', '/sports'],
                            'mobile-navigation': ['/'],
                            'footer-test': ['/']
                        },
                        _admin: {
                            alias_ids: ['/sports/baseball']
                        },
                        order: {
                            'main-site-navigation': 2002,
                            'primary-header-links': 2002,
                            'desktop-navigation': 2001,
                            'mobile-navigation': 1001,
                            default: 2002,
                            'footer-test': 1001
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
                _id: 'BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                additional_properties: {
                    fullSizeResizeUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    galleries: [
                        {
                            headlines: {
                                basic: 'test'
                            },
                            _id: 'NXOYDFRY7VAULGKBRTXVSCC5R4'
                        }
                    ],
                    ingestionMethod: 'manual',
                    keywords: [],
                    mime_type: 'image/jpeg',
                    originalName: 'architecture-3121009_1280.jpg',
                    originalUrl:
                        'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    owner: 'aaron.jansen@washpost.com',
                    proxyUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    published: true,
                    resizeUrl:
                        'http://thumbor-prod-us-east-1.photo.aws.arc.pub/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    restricted: false,
                    version: 4
                },
                address: {},
                caption: 'this is a caption',
                created_date: '2019-09-10T11:34:15Z',
                credits: {
                    by: []
                },
                geo: {},
                height: 720,
                image_type: 'photograph',
                last_updated_date: '2019-09-10T17:20:41Z',
                licensable: false,
                owner: {
                    id: 'demo',
                    sponsored: false
                },
                source: {
                    edit_url:
                        'https://demo.arcpublishing.com/photo/BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                    system: 'Anglerfish'
                },
                subtitle: 'bridge',
                taxonomy: {
                    associated_tasks: []
                },
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                version: '0.9.0',
                width: 960
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
                word_count_actual: 25,
                line_count_actual: 20,
                inch_count_actual: 3
            }
        },
        display_date: '2019-09-04T18:17:43.046Z',
        credits: {
            by: [
                {
                    _id: 'alexremington',
                    type: 'author',
                    version: '0.5.8',
                    name: 'Alex Remington',
                    org: 'Washington, DC',
                    image: {
                        url:
                            'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                        version: '0.5.8'
                    },
                    description:
                        'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                    url: '',
                    slug: '',
                    social_links: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com'
                        }
                    ],
                    socialLinks: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com',
                            deprecated: true,
                            deprecation_msg: 'Please use social_links.'
                        }
                    ],
                    additional_properties: {
                        original: {
                            _id: 'alexremington',
                            firstName: 'Alex',
                            lastName: 'Remington',
                            byline: 'Alex Remington',
                            role: 'Enterprise Account Executive',
                            image:
                                'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                            email: 'alexander.remington@washpost.com',
                            affiliations: '',
                            languages: 'English',
                            beat: 'Arc',
                            author_type: 'Staff',
                            education: [],
                            awards: [],
                            books: [],
                            podcasts: [],
                            bio_page: '',
                            location: 'Washington, DC',
                            bio:
                                'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                            longBio: '',
                            slug: '',
                            native_app_rendering: false,
                            fuzzy_match: false,
                            contributor: false,
                            status: true,
                            last_updated: '2018-02-16T14:36:06.520Z',
                            middleName: 'F.',
                            expertise: 'Arc Publishing',
                            last_updated_date: '2019-04-17T15:13:36.104Z'
                        }
                    }
                }
            ]
        },
        first_publish_date: '2019-09-04T18:17:44.675Z',
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
                            },
                            node_type: 'section',
                            inactive: false,
                            _website: 'demo'
                        }
                    },
                    _website_section_id: 'demo./sports/baseball'
                },
                website_url: '/baseball/2019/09/04/baseball-game-recap'
            }
        },
        additional_properties: {
            clipboard: {},
            has_published_copy: true,
            is_published: true,
            publish_date: '2019-09-04T18:17:44.675Z'
        },
        publish_date: '2019-09-10T18:21:12.543Z',
        publishing: {
            scheduled_operations: {
                publish_edition: [],
                unpublish_edition: []
            }
        },
        _id: 'XWEH72X4X5AOBHZQACTDKFAXAY',
        website: 'demo',
        website_url: '/baseball/2019/09/04/baseball-game-recap'
    },
    {
        type: 'story',
        version: '0.10.2',
        created_date: '2019-09-04T18:14:08.966Z',
        revision: {
            revision_id: 'GOYWGIMDWBEJVASZAJ77KONPPA',
            parent_id: 'VCGQOGZZINGYNG5PEPCH2L72JI',
            editions: ['default'],
            branch: 'default',
            user_id: 'jansena@washpost.com',
            published: true
        },
        last_updated_date: '2019-09-10T18:21:12.501Z',
        canonical_url: '/baseball/2019/09/04/baseball-game-recap',
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
                },
                {
                    _id: '/sports/basketball',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: '/sports',
                            ancestors: ['/', '/sports'],
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: 1019,
                            node_type: 'section',
                            children: []
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
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
                },
                {
                    _id: '/sports/basketball',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    parent: {
                        default: '/sports'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: {
                                default: '/sports',
                                'main-site-navigation': '/sports',
                                'primary-header-links': '/sports',
                                'desktop-navigation': '/sports'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports']
                            },
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: {
                                'main-site-navigation': 2003,
                                'primary-header-links': 2001,
                                default: 1019,
                                'desktop-navigation': 2002
                            },
                            _website: 'demo',
                            node_type: 'section',
                            children: []
                        }
                    },
                    _website_section_id: 'demo./sports/basketball'
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
                            'mobile-navigation': '/',
                            'footer-test': '/'
                        },
                        ancestors: {
                            default: ['/', '/sports'],
                            'main-site-navigation': ['/sports'],
                            'primary-header-links': ['/sports'],
                            'desktop-navigation': ['/', '/sports'],
                            'mobile-navigation': ['/'],
                            'footer-test': ['/']
                        },
                        _admin: {
                            alias_ids: ['/sports/baseball']
                        },
                        order: {
                            'main-site-navigation': 2002,
                            'primary-header-links': 2002,
                            'desktop-navigation': 2001,
                            'mobile-navigation': 1001,
                            default: 2002,
                            'footer-test': 1001
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
                _id: 'BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                additional_properties: {
                    fullSizeResizeUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    galleries: [
                        {
                            headlines: {
                                basic: 'test'
                            },
                            _id: 'NXOYDFRY7VAULGKBRTXVSCC5R4'
                        }
                    ],
                    ingestionMethod: 'manual',
                    keywords: [],
                    mime_type: 'image/jpeg',
                    originalName: 'architecture-3121009_1280.jpg',
                    originalUrl:
                        'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    owner: 'aaron.jansen@washpost.com',
                    proxyUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    published: true,
                    resizeUrl:
                        'http://thumbor-prod-us-east-1.photo.aws.arc.pub/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    restricted: false,
                    version: 4
                },
                address: {},
                caption: 'this is a caption',
                created_date: '2019-09-10T11:34:15Z',
                credits: {
                    by: []
                },
                geo: {},
                height: 720,
                image_type: 'photograph',
                last_updated_date: '2019-09-10T17:20:41Z',
                licensable: false,
                owner: {
                    id: 'demo',
                    sponsored: false
                },
                source: {
                    edit_url:
                        'https://demo.arcpublishing.com/photo/BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                    system: 'Anglerfish'
                },
                subtitle: 'bridge',
                taxonomy: {
                    associated_tasks: []
                },
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                version: '0.9.0',
                width: 960
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
                word_count_actual: 25,
                line_count_actual: 20,
                inch_count_actual: 3
            }
        },
        display_date: '2019-09-04T18:17:43.046Z',
        credits: {
            by: [
                {
                    _id: 'alexremington',
                    type: 'author',
                    version: '0.5.8',
                    name: 'Alex Remington',
                    org: 'Washington, DC',
                    image: {
                        url:
                            'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                        version: '0.5.8'
                    },
                    description:
                        'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                    url: '',
                    slug: '',
                    social_links: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com'
                        }
                    ],
                    socialLinks: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com',
                            deprecated: true,
                            deprecation_msg: 'Please use social_links.'
                        }
                    ],
                    additional_properties: {
                        original: {
                            _id: 'alexremington',
                            firstName: 'Alex',
                            lastName: 'Remington',
                            byline: 'Alex Remington',
                            role: 'Enterprise Account Executive',
                            image:
                                'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                            email: 'alexander.remington@washpost.com',
                            affiliations: '',
                            languages: 'English',
                            beat: 'Arc',
                            author_type: 'Staff',
                            education: [],
                            awards: [],
                            books: [],
                            podcasts: [],
                            bio_page: '',
                            location: 'Washington, DC',
                            bio:
                                'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                            longBio: '',
                            slug: '',
                            native_app_rendering: false,
                            fuzzy_match: false,
                            contributor: false,
                            status: true,
                            last_updated: '2018-02-16T14:36:06.520Z',
                            middleName: 'F.',
                            expertise: 'Arc Publishing',
                            last_updated_date: '2019-04-17T15:13:36.104Z'
                        }
                    }
                }
            ]
        },
        first_publish_date: '2019-09-04T18:17:44.675Z',
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
                            },
                            node_type: 'section',
                            inactive: false,
                            _website: 'demo'
                        }
                    },
                    _website_section_id: 'demo./sports/baseball'
                },
                website_url: '/baseball/2019/09/04/baseball-game-recap'
            }
        },
        additional_properties: {
            clipboard: {},
            has_published_copy: true,
            is_published: true,
            publish_date: '2019-09-04T18:17:44.675Z'
        },
        publish_date: '2019-09-10T18:21:12.543Z',
        publishing: {
            scheduled_operations: {
                publish_edition: [],
                unpublish_edition: []
            }
        },
        _id: 'XWEH72X4X5AOBHZQACTDKFAXAY',
        website: 'demo',
        website_url: '/baseball/2019/09/04/baseball-game-recap'
    },
    {
        type: 'story',
        version: '0.10.2',
        created_date: '2019-09-04T18:14:08.966Z',
        revision: {
            revision_id: 'GOYWGIMDWBEJVASZAJ77KONPPA',
            parent_id: 'VCGQOGZZINGYNG5PEPCH2L72JI',
            editions: ['default'],
            branch: 'default',
            user_id: 'jansena@washpost.com',
            published: true
        },
        last_updated_date: '2019-09-10T18:21:12.501Z',
        canonical_url: '/baseball/2019/09/04/baseball-game-recap',
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
                },
                {
                    _id: '/sports/basketball',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: '/sports',
                            ancestors: ['/', '/sports'],
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: 1019,
                            node_type: 'section',
                            children: []
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
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
                },
                {
                    _id: '/sports/basketball',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    parent: {
                        default: '/sports'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: {
                                default: '/sports',
                                'main-site-navigation': '/sports',
                                'primary-header-links': '/sports',
                                'desktop-navigation': '/sports'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports']
                            },
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: {
                                'main-site-navigation': 2003,
                                'primary-header-links': 2001,
                                default: 1019,
                                'desktop-navigation': 2002
                            },
                            _website: 'demo',
                            node_type: 'section',
                            children: []
                        }
                    },
                    _website_section_id: 'demo./sports/basketball'
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
                            'mobile-navigation': '/',
                            'footer-test': '/'
                        },
                        ancestors: {
                            default: ['/', '/sports'],
                            'main-site-navigation': ['/sports'],
                            'primary-header-links': ['/sports'],
                            'desktop-navigation': ['/', '/sports'],
                            'mobile-navigation': ['/'],
                            'footer-test': ['/']
                        },
                        _admin: {
                            alias_ids: ['/sports/baseball']
                        },
                        order: {
                            'main-site-navigation': 2002,
                            'primary-header-links': 2002,
                            'desktop-navigation': 2001,
                            'mobile-navigation': 1001,
                            default: 2002,
                            'footer-test': 1001
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
                _id: 'BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                additional_properties: {
                    fullSizeResizeUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    galleries: [
                        {
                            headlines: {
                                basic: 'test'
                            },
                            _id: 'NXOYDFRY7VAULGKBRTXVSCC5R4'
                        }
                    ],
                    ingestionMethod: 'manual',
                    keywords: [],
                    mime_type: 'image/jpeg',
                    originalName: 'architecture-3121009_1280.jpg',
                    originalUrl:
                        'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    owner: 'aaron.jansen@washpost.com',
                    proxyUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    published: true,
                    resizeUrl:
                        'http://thumbor-prod-us-east-1.photo.aws.arc.pub/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    restricted: false,
                    version: 4
                },
                address: {},
                caption: 'this is a caption',
                created_date: '2019-09-10T11:34:15Z',
                credits: {
                    by: []
                },
                geo: {},
                height: 720,
                image_type: 'photograph',
                last_updated_date: '2019-09-10T17:20:41Z',
                licensable: false,
                owner: {
                    id: 'demo',
                    sponsored: false
                },
                source: {
                    edit_url:
                        'https://demo.arcpublishing.com/photo/BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                    system: 'Anglerfish'
                },
                subtitle: 'bridge',
                taxonomy: {
                    associated_tasks: []
                },
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                version: '0.9.0',
                width: 960
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
                word_count_actual: 25,
                line_count_actual: 20,
                inch_count_actual: 3
            }
        },
        display_date: '2019-09-04T18:17:43.046Z',
        credits: {
            by: [
                {
                    _id: 'alexremington',
                    type: 'author',
                    version: '0.5.8',
                    name: 'Alex Remington',
                    org: 'Washington, DC',
                    image: {
                        url:
                            'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                        version: '0.5.8'
                    },
                    description:
                        'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                    url: '',
                    slug: '',
                    social_links: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com'
                        }
                    ],
                    socialLinks: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com',
                            deprecated: true,
                            deprecation_msg: 'Please use social_links.'
                        }
                    ],
                    additional_properties: {
                        original: {
                            _id: 'alexremington',
                            firstName: 'Alex',
                            lastName: 'Remington',
                            byline: 'Alex Remington',
                            role: 'Enterprise Account Executive',
                            image:
                                'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                            email: 'alexander.remington@washpost.com',
                            affiliations: '',
                            languages: 'English',
                            beat: 'Arc',
                            author_type: 'Staff',
                            education: [],
                            awards: [],
                            books: [],
                            podcasts: [],
                            bio_page: '',
                            location: 'Washington, DC',
                            bio:
                                'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                            longBio: '',
                            slug: '',
                            native_app_rendering: false,
                            fuzzy_match: false,
                            contributor: false,
                            status: true,
                            last_updated: '2018-02-16T14:36:06.520Z',
                            middleName: 'F.',
                            expertise: 'Arc Publishing',
                            last_updated_date: '2019-04-17T15:13:36.104Z'
                        }
                    }
                }
            ]
        },
        first_publish_date: '2019-09-04T18:17:44.675Z',
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
                            },
                            node_type: 'section',
                            inactive: false,
                            _website: 'demo'
                        }
                    },
                    _website_section_id: 'demo./sports/baseball'
                },
                website_url: '/baseball/2019/09/04/baseball-game-recap'
            }
        },
        additional_properties: {
            clipboard: {},
            has_published_copy: true,
            is_published: true,
            publish_date: '2019-09-04T18:17:44.675Z'
        },
        publish_date: '2019-09-10T18:21:12.543Z',
        publishing: {
            scheduled_operations: {
                publish_edition: [],
                unpublish_edition: []
            }
        },
        _id: 'XWEH72X4X5AOBHZQACTDKFAXAY',
        website: 'demo',
        website_url: '/baseball/2019/09/04/baseball-game-recap'
    },
    {
        type: 'story',
        version: '0.10.2',
        created_date: '2019-09-04T18:14:08.966Z',
        revision: {
            revision_id: 'GOYWGIMDWBEJVASZAJ77KONPPA',
            parent_id: 'VCGQOGZZINGYNG5PEPCH2L72JI',
            editions: ['default'],
            branch: 'default',
            user_id: 'jansena@washpost.com',
            published: true
        },
        last_updated_date: '2019-09-10T18:21:12.501Z',
        canonical_url: '/baseball/2019/09/04/baseball-game-recap',
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
                },
                {
                    _id: '/sports/basketball',
                    type: 'site',
                    version: '0.5.8',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: '/sports',
                            ancestors: ['/', '/sports'],
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: 1019,
                            node_type: 'section',
                            children: []
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
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
                },
                {
                    _id: '/sports/basketball',
                    _website: 'demo',
                    type: 'section',
                    version: '0.6.0',
                    name: 'Basketball',
                    description: 'Latest basketball sports and scores.',
                    path: '/sports/basketball',
                    parent_id: '/sports',
                    parent: {
                        default: '/sports'
                    },
                    additional_properties: {
                        original: {
                            _id: '/sports/basketball',
                            site: {
                                site_title: 'Basketball',
                                site_url: '/sports/basketball',
                                site_description:
                                    'Latest basketball sports and scores.',
                                site_keywords:
                                    'basketball,sports,scores,scoreboard,ncaa'
                            },
                            name: 'Basketball',
                            parent: {
                                default: '/sports',
                                'main-site-navigation': '/sports',
                                'primary-header-links': '/sports',
                                'desktop-navigation': '/sports'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports']
                            },
                            _admin: {
                                alias_ids: ['/sports/basketball']
                            },
                            inactive: false,
                            order: {
                                'main-site-navigation': 2003,
                                'primary-header-links': 2001,
                                default: 1019,
                                'desktop-navigation': 2002
                            },
                            _website: 'demo',
                            node_type: 'section',
                            children: []
                        }
                    },
                    _website_section_id: 'demo./sports/basketball'
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
                            'mobile-navigation': '/',
                            'footer-test': '/'
                        },
                        ancestors: {
                            default: ['/', '/sports'],
                            'main-site-navigation': ['/sports'],
                            'primary-header-links': ['/sports'],
                            'desktop-navigation': ['/', '/sports'],
                            'mobile-navigation': ['/'],
                            'footer-test': ['/']
                        },
                        _admin: {
                            alias_ids: ['/sports/baseball']
                        },
                        order: {
                            'main-site-navigation': 2002,
                            'primary-header-links': 2002,
                            'desktop-navigation': 2001,
                            'mobile-navigation': 1001,
                            default: 2002,
                            'footer-test': 1001
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
                _id: 'BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                additional_properties: {
                    fullSizeResizeUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    galleries: [
                        {
                            headlines: {
                                basic: 'test'
                            },
                            _id: 'NXOYDFRY7VAULGKBRTXVSCC5R4'
                        }
                    ],
                    ingestionMethod: 'manual',
                    keywords: [],
                    mime_type: 'image/jpeg',
                    originalName: 'architecture-3121009_1280.jpg',
                    originalUrl:
                        'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    owner: 'aaron.jansen@washpost.com',
                    proxyUrl:
                        '/photo/resize/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    published: true,
                    resizeUrl:
                        'http://thumbor-prod-us-east-1.photo.aws.arc.pub/1PVx9k0TuwavHvZ6vcQUn0vMc7I=/arc-anglerfish-arc2-prod-demo/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                    restricted: false,
                    version: 4
                },
                address: {},
                caption: 'this is a caption',
                created_date: '2019-09-10T11:34:15Z',
                credits: {
                    by: []
                },
                geo: {},
                height: 720,
                image_type: 'photograph',
                last_updated_date: '2019-09-10T17:20:41Z',
                licensable: false,
                owner: {
                    id: 'demo',
                    sponsored: false
                },
                source: {
                    edit_url:
                        'https://demo.arcpublishing.com/photo/BOFS74XX7ZAC7H4LFSDHZRUSLQ',
                    system: 'Anglerfish'
                },
                subtitle: 'bridge',
                taxonomy: {
                    associated_tasks: []
                },
                type: 'image',
                url:
                    'https://arc-anglerfish-arc2-prod-demo.s3.amazonaws.com/public/BOFS74XX7ZAC7H4LFSDHZRUSLQ.jpg',
                version: '0.9.0',
                width: 960
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
                word_count_actual: 25,
                line_count_actual: 20,
                inch_count_actual: 3
            }
        },
        display_date: '2019-09-04T18:17:43.046Z',
        credits: {
            by: [
                {
                    _id: 'alexremington',
                    type: 'author',
                    version: '0.5.8',
                    name: 'Alex Remington',
                    org: 'Washington, DC',
                    image: {
                        url:
                            'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                        version: '0.5.8'
                    },
                    description:
                        'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                    url: '',
                    slug: '',
                    social_links: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com'
                        }
                    ],
                    socialLinks: [
                        {
                            site: 'email',
                            url: 'alexander.remington@washpost.com',
                            deprecated: true,
                            deprecation_msg: 'Please use social_links.'
                        }
                    ],
                    additional_properties: {
                        original: {
                            _id: 'alexremington',
                            firstName: 'Alex',
                            lastName: 'Remington',
                            byline: 'Alex Remington',
                            role: 'Enterprise Account Executive',
                            image:
                                'https://s3.amazonaws.com/arc-authors/demo/81f686b0-e312-44a3-91f4-19d793d3d19e.jpeg',
                            email: 'alexander.remington@washpost.com',
                            affiliations: '',
                            languages: 'English',
                            beat: 'Arc',
                            author_type: 'Staff',
                            education: [],
                            awards: [],
                            books: [],
                            podcasts: [],
                            bio_page: '',
                            location: 'Washington, DC',
                            bio:
                                'Alex Remington is an executive with Arc Publishing. He enjoys baseball, rock music, and stand-up comedy!',
                            longBio: '',
                            slug: '',
                            native_app_rendering: false,
                            fuzzy_match: false,
                            contributor: false,
                            status: true,
                            last_updated: '2018-02-16T14:36:06.520Z',
                            middleName: 'F.',
                            expertise: 'Arc Publishing',
                            last_updated_date: '2019-04-17T15:13:36.104Z'
                        }
                    }
                }
            ]
        },
        first_publish_date: '2019-09-04T18:17:44.675Z',
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
                                'mobile-navigation': '/',
                                'footer-test': '/'
                            },
                            ancestors: {
                                default: ['/', '/sports'],
                                'main-site-navigation': ['/sports'],
                                'primary-header-links': ['/sports'],
                                'desktop-navigation': ['/', '/sports'],
                                'mobile-navigation': ['/'],
                                'footer-test': ['/']
                            },
                            _admin: {
                                alias_ids: ['/sports/baseball']
                            },
                            order: {
                                'main-site-navigation': 2002,
                                'primary-header-links': 2002,
                                'desktop-navigation': 2001,
                                'mobile-navigation': 1001,
                                default: 2002,
                                'footer-test': 1001
                            },
                            node_type: 'section',
                            inactive: false,
                            _website: 'demo'
                        }
                    },
                    _website_section_id: 'demo./sports/baseball'
                },
                website_url: '/baseball/2019/09/04/baseball-game-recap'
            }
        },
        additional_properties: {
            clipboard: {},
            has_published_copy: true,
            is_published: true,
            publish_date: '2019-09-04T18:17:44.675Z'
        },
        publish_date: '2019-09-10T18:21:12.543Z',
        publishing: {
            scheduled_operations: {
                publish_edition: [],
                unpublish_edition: []
            }
        },
        _id: 'XWEH72X4X5AOBHZQACTDKFAXAY',
        website: 'demo',
        website_url: '/baseball/2019/09/04/baseball-game-recap'
    }
];

export default articles;
