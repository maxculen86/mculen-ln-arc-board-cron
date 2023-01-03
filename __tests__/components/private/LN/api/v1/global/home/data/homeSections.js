import { articlesCollections } from './articlesCollections';
import { articlesManual } from './articlesManual';

export const homeSections = [
    {
        type: 3,
        sectionAliasMobile: 'Anticipo',
        information: {
            hideCaja: false,
            title:
                'Capitanich: "El Presidente debe desconocer el fallo de la Corte y hacerle juicio político"',
            url:
                'https://www.lanacion.com.ar/politica/jorge-capitanich-dijo-que-el-presidente-debe-desconocer-el-fallo-de-la-corte-nid21122022/',
            nameFeature: 'LN-common/cajaAnticipo',
            idRender: 'f0fWCmFYb5m37Fg'
        },
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Anticipo',
        sectionWeb: 'Anticipo'
    },
    {
        type: 2,
        sectionAliasMobile: 'AnexoMobile',
        information: {
            hideCaja: false,
            layout: 'grilla1',
            nameFeature: 'LN-common/anexo',
            idRender: 'f0f3KYV3ghQE84H'
        },
        articles: [
            {
                url:
                    'https://especialess3.lanacion.com.ar/interactivos/22/12/mundial2022_anexo_mensajes/',
                alto: 250
            }
        ],
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'AnexoMobile',
        sectionWeb: 'Anexo_1'
    },
    {
        type: 0,
        sectionAliasMobile: 'Apertura',
        information: {
            layout: 'focalLeft3',
            initialPosition: 1,
            hideTitle: false,
            hideCaja: false,
            title: '',
            url: '',
            pbInternal_cloneId: 'c0faaS86p5aj3t8',
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0faaS86p5aj3t8'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Apertura',
        sectionWeb: 'Apertura_1'
    },
    {
        type: 2,
        sectionAliasMobile: 'AnexoMobile',
        information: {
            layout: 'grilla1',
            nameFeature: 'LN-common/anexo',
            idRender: 'f0fTYDLi4COI6o'
        },
        articles: [],
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'AnexoMobile',
        sectionWeb: 'Anexo_2'
    },
    {
        id: 402,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'bottom'
    },
    {
        type: 0,
        sectionAliasMobile: 'Apertura',
        information: {
            layout: 'grillaUltimasNoticias',
            initialPosition: 1,
            hideTitle: true,
            hideCaja: false,
            title: 'Actualidad',
            url: '',
            imageId: '',
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0fVDIkVxasG8tL'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Apertura',
        sectionWeb: 'Apertura_2'
    },
    {
        type: 0,
        sectionAliasMobile: 'Timeline',
        information: {
            size: 5,
            sectionTagType: 'Tag',
            sectionTagValue: '',
            collectionId: '',
            url: '',
            title: 'Últimas noticias',
            hideTitle: false,
            sections: ['/deportes', '/politica'],
            source: 'byLastNews',
            layout: 'timeline',
            image: null,
            nameFeature: 'LN-acumulado/timeline',
            idRender: 'f0ffoh4jbnnWmc',
            hideCaja: false
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Apertura',
        sectionWeb: 'Apertura_2'
    },
    {
        id: 2000,
        type: 1,
        sectionAliasMobile: 'Dolar',
        position: 'bottom'
    },
    {
        type: 0,
        sectionAliasMobile: 'Multimedia',
        information: {
            layout: 'grilla1',
            initialPosition: 1,
            hideTitle: false,
            hideCaja: false,
            imageId: '6KXD6N3ZOBEDBN4PSTA2LSOTCM',
            title: '',
            url: '',
            noteId: 'SWYECOXKM5HS5JW6TEF7ILX47E',
            mobileImageId: '5C7HZEH565DP7BHDFVJLFYR5VM',
            video: '38d981b2-b916-42d3-a507-8ac873a2d05d',
            hideByHtml: false,
            html: '',
            authors: '',
            image: {
                promo_items: {
                    basic: {
                        _id: '6KXD6N3ZOBEDBN4PSTA2LSOTCM',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/Ur3g7YwC7wxhntZUOA7JEUCt2hA=/arc-anglerfish-arc2-prod-lanacionar/public/6KXD6N3ZOBEDBN4PSTA2LSOTCM.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'a fondo home.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6KXD6N3ZOBEDBN4PSTA2LSOTCM.png',
                            owner: 'mralcobendas@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/Ur3g7YwC7wxhntZUOA7JEUCt2hA=/arc-anglerfish-arc2-prod-lanacionar/public/6KXD6N3ZOBEDBN4PSTA2LSOTCM.png',
                            published: true,
                            resizeUrl:
                                '/resizer/Ur3g7YwC7wxhntZUOA7JEUCt2hA=/arc-anglerfish-arc2-prod-lanacionar/public/6KXD6N3ZOBEDBN4PSTA2LSOTCM.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/X5ZSFWI3FfPgm6jKKbUYHReqZUc=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/6KXD6N3ZOBEDBN4PSTA2LSOTCM.png',
                            version: 0,
                            template_id: 707
                        },
                        address: {},
                        auth: {
                            '1':
                                '4cf9282059578dc2522ad7b38dcccd91f911ab3f9b7c4914d850f87538c9adef'
                        },
                        caption: 'CABEZAL PARA HOME SECCIÓN A Fondo',
                        created_date: '2021-09-29T16:36:13Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-09-29T16:36:13Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/17u3JmzFxX0m-mqKdcpnievvSBY=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6KXD6N3ZOBEDBN4PSTA2LSOTCM.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/yNOzVB449ynt2ZkuCm6SOigy1dg=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/6KXD6N3ZOBEDBN4PSTA2LSOTCM.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    'b87cbcbc71446dcdee4c22eac1f1892524b54f5d9912567e1701e08e91e19765'
            },
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0fbFlnwxEAv8b4'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Multimedia',
        sectionWeb: 'Multimedia'
    },
    {
        id: 403,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema1',
        information: {
            layout: 'grilla9',
            initialPosition: 1,
            hideTitle: false,
            hideCaja: false,
            title: 'Actualidad',
            url: '',
            pbInternal_cloneId: 'c0fqYGcEVmTr1Lf',
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0fqYGcEVmTr1Lf'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema1',
        sectionWeb: 'Breaking_1'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema1',
        information: {
            layout: 'grilla9',
            initialPosition: 1,
            hideTitle: true,
            hideCaja: false,
            title: 'Actualidad',
            url: '',
            pbInternal_cloneId: 'c0fLXaiAzO1lcW',
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0fLXaiAzO1lcW'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema1',
        sectionWeb: 'Breaking_1'
    },
    {
        type: 2,
        sectionAliasMobile: 'AnexoMobile',
        information: {
            hideCaja: false,
            layout: 'grilla1',
            nameFeature: 'LN-common/anexo',
            idRender: 'f0ftmqzRdWiC9n0'
        },
        articles: [
            {
                url:
                    'https://especialess3.lanacion.com.ar/22/11/anexo-anuario-2022/?v=2',
                alto: 636
            }
        ],
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema1',
        sectionWeb: 'Breaking_1'
    },
    {
        id: 404,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema2',
        information: {
            layout: 'grilla9',
            initialPosition: 1,
            hideTitle: false,
            hideCaja: false,
            title: 'Más noticias',
            url: '',
            pbInternal_cloneId: 'c0fXHpVfNlHv6IH',
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0fXHpVfNlHv6IH'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema2',
        sectionWeb: 'Breaking_2'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema2',
        information: {
            layout: 'grilla9',
            initialPosition: 1,
            hideTitle: true,
            hideCaja: false,
            title: 'Más noticias',
            url: '',
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0f39lpq2E3l6rf'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema2',
        sectionWeb: 'Breaking_2'
    },
    {
        id: 405,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema3',
        information: {
            layout: 'grilla3',
            initialPosition: 1,
            hideTitle: false,
            hideCaja: false,
            title: 'Te puede interesar',
            url: '',
            pbInternal_cloneId: 'c0fgSJBRnQED2Fo',
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0fgSJBRnQED2Fo'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema3',
        sectionWeb: 'Breaking_3'
    },
    {
        type: 2,
        sectionAliasMobile: 'AnexoMobile',
        information: {
            hideCaja: false,
            layout: 'grilla1',
            nameFeature: 'LN-common/anexo',
            idRender: 'f0fgs76W1BhhPB'
        },
        articles: [
            {
                url:
                    'https://especialeslntools.lanacion.com.ar/generic-manija-mundial/index.html',
                alto: 300
            }
        ],
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'AnexoMobile',
        sectionWeb: 'Anexo_3'
    },
    {
        id: 406,
        type: 1,
        sectionAliasMobile: 'Banner',
        position: 'start'
    },
    {
        type: 0,
        sectionAliasMobile: 'Opinion',
        information: {
            layout: 'opinion4',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'VVPBSCDUKVCX3ILAF6752UK5PU',
            title: 'Opinión',
            url: 'https://www.lanacion.com.ar/opinion/',
            hideCaja: false,
            nameFeature: 'LN-common/opinion',
            idRender: 'f0fI9Q32U5Q6aBo'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Opinion',
        sectionWeb: 'Opinion'
    },
    {
        type: 0,
        sectionAliasMobile: 'Opinion',
        information: {
            layout: 'editoriales2',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'KPYCGTLLQJBM5FIWYYES4RIDNI',
            title: 'Editoriales',
            url: 'https://www.lanacion.com.ar/editoriales/',
            nameFeature: 'LN-common/editoriales',
            idRender: 'f0fWh9C5NCli6Oc'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Opinion',
        sectionWeb: 'Opinion'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema5',
        information: {
            layout: 'grilla6',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'CYXQVFZFCRCQTCAMO7CURLVPIQ',
            title: '',
            hideCaja: false,
            imageId: 'ZZEXVFIL2ZFHBIQVL7GN632OXU',
            url: '',
            image: {
                promo_items: {
                    basic: {
                        _id: 'ZZEXVFIL2ZFHBIQVL7GN632OXU',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/4ZglkroL48ure4GPGXpbb5_R1Z4=/arc-anglerfish-arc2-prod-lanacionar/public/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'hashtag-home.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            owner: 'mralcobendas@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/4ZglkroL48ure4GPGXpbb5_R1Z4=/arc-anglerfish-arc2-prod-lanacionar/public/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            published: true,
                            resizeUrl:
                                '/resizer/4ZglkroL48ure4GPGXpbb5_R1Z4=/arc-anglerfish-arc2-prod-lanacionar/public/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/dG-IMjs8zsUqS04W2bt7A6LzwsU=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            version: 0,
                            template_id: 707
                        },
                        address: {},
                        auth: {
                            '1':
                                'a8b68d452c2dfd72e46c0bb1a34cb458b55cf76f911a841f39ec409e5a4ba043'
                        },
                        caption: 'cabezal home hashtag',
                        created_date: '2021-06-10T22:03:23Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-06-10T22:03:23Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/YOCCSvhbiAE13yWk1uZMQGHc3XA=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/GSTdEEwicyf0Vw-4NiRxmImGfoA=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    'ab746ac28316b2d07c02450e342f46141c81f307d0b1ace28e025f1b8badb855'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fw0EaO2aEZ8bQ'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema5',
        sectionWeb: 'Breaking_5'
    },
    {
        type: 0,
        sectionAliasMobile: 'Comercial',
        information: {
            layout: 'grilla1',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'K63QH2H6TJBXLKQVM256T4NW2E',
            title: '',
            hideCaja: false,
            imageId: 'BW4Z2VMK3NER5FCDQI4IIU6TV',
            url: '',
            noteId: 'KKO6QURXZZG43EUE6NKOZUHMTY',
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0fGyXAGxF0z8AH'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Comercial',
        sectionWeb: 'Comercial_1'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema7',
        information: {
            layout: 'grilla2',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'MMXFXAEYGRFDFOVDIUDXTRYQRE',
            title: 'Política',
            url: 'https://www.lanacion.com.ar/politica/',
            imageId: 'XDW3TU62JRDFBPPR3C42T4MRMY',
            hideCaja: false,
            image: {
                promo_items: {
                    basic: {
                        _id: 'XDW3TU62JRDFBPPR3C42T4MRMY',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/PRaa8uFpB995g77-mc1wesTbDiY=/arc-anglerfish-arc2-prod-lanacionar/public/XDW3TU62JRDFBPPR3C42T4MRMY.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'politica-home.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/XDW3TU62JRDFBPPR3C42T4MRMY.png',
                            owner: 'mralcobendas@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/PRaa8uFpB995g77-mc1wesTbDiY=/arc-anglerfish-arc2-prod-lanacionar/public/XDW3TU62JRDFBPPR3C42T4MRMY.png',
                            published: true,
                            resizeUrl:
                                '/resizer/PRaa8uFpB995g77-mc1wesTbDiY=/arc-anglerfish-arc2-prod-lanacionar/public/XDW3TU62JRDFBPPR3C42T4MRMY.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/zWkAx9MA4fnR1lbA4P5KWcSEhQY=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/XDW3TU62JRDFBPPR3C42T4MRMY.png',
                            version: 0,
                            template_id: 706
                        },
                        address: {},
                        auth: {
                            '1':
                                '96414986beec22d1415d4cefeeb8ebd71d6f077384be704fbafad7d682a801de'
                        },
                        caption: 'cabezal home Política',
                        created_date: '2021-06-09T00:23:17Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-06-09T00:23:17Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/7j7p4Xzt1RbTTPAOvfaWdHwU0VM=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/XDW3TU62JRDFBPPR3C42T4MRMY.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/4Jb5pOrPbqCWMIo3KPquA3S_HOM=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/XDW3TU62JRDFBPPR3C42T4MRMY.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '609c4a75873a2026f6e8ffc659c5e38d36237c59b97c80b8c6f75bbdc6417759'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fJk2LUjoxq7c0'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema7',
        sectionWeb: 'Bloque_2'
    },
    {
        type: 0,
        sectionAliasMobile: 'Comercial',
        information: {
            layout: 'grilla2',
            initialPosition: 1,
            hideTitle: false,
            title: '+Salidas',
            idCollection: 'MYHTCZ4CRBCA3FA7A23JU4IQUE',
            hideCaja: false,
            url: 'https://www.lanacion.com.ar/tema/salidas-tid46948/',
            imageId: '7T2CWHR6IRCZFO7HC2CRF43XWU',
            noteId: '7B3ETU43CJBFNCWX7RB2KTJZJU',
            image: {
                promo_items: {
                    basic: {
                        _id: '7T2CWHR6IRCZFO7HC2CRF43XWU',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/4_oNJWLDTK5WNvoJRUep1XaDqTc=/arc-anglerfish-arc2-prod-lanacionar/public/7T2CWHR6IRCZFO7HC2CRF43XWU.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'massalidas.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/7T2CWHR6IRCZFO7HC2CRF43XWU.png',
                            owner: 'gastonrenzetti@gmail.com',
                            proxyUrl:
                                '/resizer/4_oNJWLDTK5WNvoJRUep1XaDqTc=/arc-anglerfish-arc2-prod-lanacionar/public/7T2CWHR6IRCZFO7HC2CRF43XWU.png',
                            published: true,
                            resizeUrl:
                                '/resizer/4_oNJWLDTK5WNvoJRUep1XaDqTc=/arc-anglerfish-arc2-prod-lanacionar/public/7T2CWHR6IRCZFO7HC2CRF43XWU.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/bnehXQNbtwcGLCzSGisa-_nI3xc=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/7T2CWHR6IRCZFO7HC2CRF43XWU.png',
                            version: 0,
                            template_id: 707
                        },
                        address: {},
                        auth: {
                            '1':
                                '908fcbc1f76424cdd6e3b083f7fca832dfd2d7d77bb08d96ffa3563376e14b44'
                        },
                        caption: '.',
                        created_date: '2022-06-29T13:25:47Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2022-06-29T13:25:47Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/jIvYOpeS_ngy_5q775OB3u4h4Tw=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/7T2CWHR6IRCZFO7HC2CRF43XWU.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/hMfQLoczWdloP42Ui6-560T7mCE=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/7T2CWHR6IRCZFO7HC2CRF43XWU.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '948943bf99525c8e352615e9b3162bc92d8ab3af4d24e3514a300eae6c7d6caa'
            },
            nameChain: 'Ln_Caja_Manual',
            idRender: 'c0fwps8KgQku7du'
        },
        articles: articlesManual,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Comercial',
        sectionWeb: 'Comercial_2'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema8',
        information: {
            layout: 'grilla6',
            initialPosition: 1,
            hideTitle: false,
            idCollection: '5NYCOODQXBEZPPDDEL62CKU27A',
            title: 'Comunidad de Negocios',
            url: 'https://www.lanacion.com.ar/economia/',
            hideCaja: false,
            imageId: 'ROMIJBK7NBCFLGFU774VAOB3XI           ',
            image: {
                promo_items: {
                    basic: {
                        _id: 'ROMIJBK7NBCFLGFU774VAOB3XI',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/aL-Wfc1XyBROIfqsK_JzB-il2gs=/arc-anglerfish-arc2-prod-lanacionar/public/ROMIJBK7NBCFLGFU774VAOB3XI.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'Title_Negocios.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ROMIJBK7NBCFLGFU774VAOB3XI.png',
                            owner: 'rmantilero@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/aL-Wfc1XyBROIfqsK_JzB-il2gs=/arc-anglerfish-arc2-prod-lanacionar/public/ROMIJBK7NBCFLGFU774VAOB3XI.png',
                            published: true,
                            resizeUrl:
                                '/resizer/aL-Wfc1XyBROIfqsK_JzB-il2gs=/arc-anglerfish-arc2-prod-lanacionar/public/ROMIJBK7NBCFLGFU774VAOB3XI.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/I4axYpFrpf7W6wMmv7U2u_wxtNc=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/ROMIJBK7NBCFLGFU774VAOB3XI.png',
                            version: 0,
                            template_id: 706
                        },
                        address: {},
                        auth: {
                            '1':
                                'a29dbe4b0a61f9adf1c537e0d382ce6bc5e747bef82a2ff4b4fd79a742ba5940'
                        },
                        caption:
                            'logos de marcas de LA NACION para techos de home',
                        created_date: '2021-06-03T21:05:42Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-06-03T21:05:42Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/-6pTLPWnAVNmMgYaQkuzHlBqYGI=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ROMIJBK7NBCFLGFU774VAOB3XI.png',
                        version: '0.10.3',
                        width: 768,
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/TzH1jZoiEX7FuRlDDbvm8TBat1Q=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ROMIJBK7NBCFLGFU774VAOB3XI.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '317a5410c60eda7d2c3ae2d774feb5f2223d1d9009bf0980e06b96034abb2180'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fcc3gB1HODwR'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema8',
        sectionWeb: 'Bloque_3'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema8',
        information: {
            layout: 'focalLeft3',
            initialPosition: 1,
            hideTitle: false,
            hideCaja: false,
            idCollection: 'IISMZGOSGJELHBBSV6XE2IDMUU',
            imageId: 'OQE5PRUUDFEEFG47BVDGPZQKVQ ',
            title: 'LN Bienestar',
            url: 'https://www.lanacion.com.ar/salud/',
            image: {
                promo_items: {
                    basic: {
                        _id: 'OQE5PRUUDFEEFG47BVDGPZQKVQ',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/CY1516wU0iS0c51j_kmE6YWyN5w=/arc-anglerfish-arc2-prod-lanacionar/public/OQE5PRUUDFEEFG47BVDGPZQKVQ.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'logo_home_bienestar.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/OQE5PRUUDFEEFG47BVDGPZQKVQ.png',
                            owner: 'abliffeld@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/CY1516wU0iS0c51j_kmE6YWyN5w=/arc-anglerfish-arc2-prod-lanacionar/public/OQE5PRUUDFEEFG47BVDGPZQKVQ.png',
                            published: true,
                            resizeUrl:
                                '/resizer/CY1516wU0iS0c51j_kmE6YWyN5w=/arc-anglerfish-arc2-prod-lanacionar/public/OQE5PRUUDFEEFG47BVDGPZQKVQ.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/YcM2_9Lg-LnEB-bdbH6-RXIArxU=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/OQE5PRUUDFEEFG47BVDGPZQKVQ.png',
                            version: 0,
                            template_id: 706
                        },
                        address: {},
                        auth: {
                            '1':
                                'd99af06729bf4c2c1691f338b55e3afe550857936bb961985d79448c0d1fa54e'
                        },
                        caption: 'cabezal bienestar home',
                        created_date: '2022-04-11T20:21:41Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2022-04-11T20:21:41Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/oxulwTJwxXPUqEFFtQhOrLb0Ods=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/OQE5PRUUDFEEFG47BVDGPZQKVQ.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/aAaHxNGkPOOcUhvCF7RFhJUXsOo=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/OQE5PRUUDFEEFG47BVDGPZQKVQ.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '061b5791098f0d1aaaf2df2ec7f1091284b028cce0050af5593cb9a844ed3f73'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0f8AstaDaqx2uz'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema8',
        sectionWeb: 'Bloque_3'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema9',
        information: {
            layout: 'focalLeft3',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'AQ3VFMYQY5GINFDAZOOTDZUZKM',
            hideCaja: false,
            title: 'LN Movilidad',
            url: 'https://www.lanacion.com.ar/autos/',
            imageId: 'UYXO7FIVS5B6JPJTEEYCLXX3PY',
            pbInternal_cloneId: 'c0fUQ7noK1rx8uM',
            image: {
                promo_items: {
                    basic: {
                        _id: 'UYXO7FIVS5B6JPJTEEYCLXX3PY',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/-D7PrlKoExH-pA6ppBhQriPP9lA=/arc-anglerfish-arc2-prod-lanacionar/public/UYXO7FIVS5B6JPJTEEYCLXX3PY.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'logo_movilidad.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/UYXO7FIVS5B6JPJTEEYCLXX3PY.png',
                            owner: 'ganton@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/-D7PrlKoExH-pA6ppBhQriPP9lA=/arc-anglerfish-arc2-prod-lanacionar/public/UYXO7FIVS5B6JPJTEEYCLXX3PY.png',
                            published: true,
                            resizeUrl:
                                '/resizer/-D7PrlKoExH-pA6ppBhQriPP9lA=/arc-anglerfish-arc2-prod-lanacionar/public/UYXO7FIVS5B6JPJTEEYCLXX3PY.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/c75cmvwLmnWbxN9lL6eF-LihkIY=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/UYXO7FIVS5B6JPJTEEYCLXX3PY.png',
                            version: 0,
                            template_id: 706
                        },
                        address: {},
                        auth: {
                            '1':
                                '9d2eecc4912754f90e21ab0a7b1e4f697eca2561c2a9eaafeae821d5fc58de5f'
                        },
                        caption: 'Logo Movilidad',
                        created_date: '2022-04-18T16:02:22Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2022-04-18T16:02:22Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/fifwWE83nV6hcy9h7IOMee-rHSU=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/UYXO7FIVS5B6JPJTEEYCLXX3PY.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/XlNiSQQJR7Vyc8aTfJ_Be5lQcok=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/UYXO7FIVS5B6JPJTEEYCLXX3PY.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '9951e0611ecebbb7e66d9491daf97faad164ad10cb037a1874d609d2ca46a012'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fUQ7noK1rx8uM'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema9',
        sectionWeb: 'Bloque_4'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema10',
        information: {
            layout: 'focalLeft3',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'IV7MQKVP7VBUVDCJYYCIDTXF6M',
            imageId: 'WAKT22CV3FDBBJEWLL3MKRGU5M',
            url: 'https://www.lanacion.com.ar/propiedades/',
            title: 'Propiedades',
            image: {
                promo_items: {
                    basic: {
                        _id: 'WAKT22CV3FDBBJEWLL3MKRGU5M',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/Iy177CLmXal-5B0ocDCVU9TS44c=/arc-anglerfish-arc2-prod-lanacionar/public/WAKT22CV3FDBBJEWLL3MKRGU5M.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'Title_LN-Propiedades.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WAKT22CV3FDBBJEWLL3MKRGU5M.png',
                            owner: 'rmantilero@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/Iy177CLmXal-5B0ocDCVU9TS44c=/arc-anglerfish-arc2-prod-lanacionar/public/WAKT22CV3FDBBJEWLL3MKRGU5M.png',
                            published: true,
                            resizeUrl:
                                '/resizer/Iy177CLmXal-5B0ocDCVU9TS44c=/arc-anglerfish-arc2-prod-lanacionar/public/WAKT22CV3FDBBJEWLL3MKRGU5M.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/lAE8v665C91OpVqk6gv7kvUlI_0=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/WAKT22CV3FDBBJEWLL3MKRGU5M.png',
                            version: 0,
                            template_id: 706
                        },
                        address: {},
                        auth: {
                            '1':
                                '6bb76770b81e67247f151e3beac63a2ec6df2e7ff4d536c3e7de7e956e0f8a1c'
                        },
                        caption:
                            'logos de marcas de LA NACION para techos de home',
                        created_date: '2021-06-03T21:05:42Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-06-03T21:05:42Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/vE7YUUco-YxDfE-aGKZiAcrlGhY=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WAKT22CV3FDBBJEWLL3MKRGU5M.png',
                        version: '0.10.3',
                        width: 768,
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/3O1nu_gT-ZzF17Nz1Qm2LWzuSX4=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/WAKT22CV3FDBBJEWLL3MKRGU5M.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '9a7cd813480f1e573beef0296da0ecb20d4a8c016c0593b50b1f43d939b5f137'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fnxXzBRL7tbn7'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema10',
        sectionWeb: 'Bloque_5'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema10',
        information: {
            layout: 'grilla6',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'LVSMEZLSKFHA7FSDFWN6VBE4WA',
            title: 'Campo',
            url: 'https://www.lanacion.com.ar/economia/campo/',
            imageId: 'AUAHRDPBBRBIFDRWAHFJZHM5OA',
            pbInternal_cloneId: 'c0f0wXvP2Z3daiB',
            hideCaja: false,
            image: {
                promo_items: {
                    basic: {
                        _id: 'AUAHRDPBBRBIFDRWAHFJZHM5OA',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/62ZcTj4qKVRcVqdAT6lXBhcHTIQ=/arc-anglerfish-arc2-prod-lanacionar/public/AUAHRDPBBRBIFDRWAHFJZHM5OA.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'campo_prueba-tamaño.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/AUAHRDPBBRBIFDRWAHFJZHM5OA.png',
                            owner: 'jalvarez@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/62ZcTj4qKVRcVqdAT6lXBhcHTIQ=/arc-anglerfish-arc2-prod-lanacionar/public/AUAHRDPBBRBIFDRWAHFJZHM5OA.png',
                            published: true,
                            resizeUrl:
                                '/resizer/62ZcTj4qKVRcVqdAT6lXBhcHTIQ=/arc-anglerfish-arc2-prod-lanacionar/public/AUAHRDPBBRBIFDRWAHFJZHM5OA.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/RKh3-YnYKqcjnuP6_afZ9cwqof4=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/AUAHRDPBBRBIFDRWAHFJZHM5OA.png',
                            version: 0,
                            template_id: 706
                        },
                        address: {},
                        auth: {
                            '1':
                                '0c3007ae6b93ca26f82f164e936181fda8b07e518d4ab7add2e6b5e4513c031b'
                        },
                        caption: 'Nuevo logo LN Campo',
                        created_date: '2021-05-26T18:30:51Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-05-26T18:30:51Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/cMn17bYO_pRP2ZnTnCYmkR_4J9I=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/AUAHRDPBBRBIFDRWAHFJZHM5OA.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/R8gDfAbBGmHGlqiUwY0FPi2RGQ8=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/AUAHRDPBBRBIFDRWAHFJZHM5OA.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '69c97e5a12a808c1da9351ac999574a249b708bb5bffe9961f93abd8c0c187ac'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0f0wXvP2Z3daiB'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema10',
        sectionWeb: 'Bloque_5'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema11',
        information: {
            layout: 'focalLeft3',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'AFNED2VCABCFFL7QULNFBJDPAY',
            url: 'https://www.lanacion.com.ar/espectaculos/',
            title: 'Espectáculos',
            imageId: 'TIT2HNQO7VDC5BT5G4AIVF7TDE',
            hideCaja: false,
            image: {
                promo_items: {
                    basic: {
                        _id: 'TIT2HNQO7VDC5BT5G4AIVF7TDE',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/1FvFa1T2CbsX9Uys9BxtOYwRyfw=/arc-anglerfish-arc2-prod-lanacionar/public/TIT2HNQO7VDC5BT5G4AIVF7TDE.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'espectaculos-home.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/TIT2HNQO7VDC5BT5G4AIVF7TDE.png',
                            owner: 'mralcobendas@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/1FvFa1T2CbsX9Uys9BxtOYwRyfw=/arc-anglerfish-arc2-prod-lanacionar/public/TIT2HNQO7VDC5BT5G4AIVF7TDE.png',
                            published: true,
                            resizeUrl:
                                '/resizer/1FvFa1T2CbsX9Uys9BxtOYwRyfw=/arc-anglerfish-arc2-prod-lanacionar/public/TIT2HNQO7VDC5BT5G4AIVF7TDE.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/hgocoin5dRGolnTVePN4Abuci0A=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/TIT2HNQO7VDC5BT5G4AIVF7TDE.png',
                            version: 0,
                            template_id: 707
                        },
                        address: {},
                        auth: {
                            '1':
                                '8ba271eac04498c1915b9b92e09b7bc959ce7aaa52d4b06652455184ec487ee1'
                        },
                        caption: 'cabezal espectáculos home',
                        created_date: '2021-06-08T22:50:18Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-06-08T22:50:18Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/7GVavxVW5k4f2DAvppxS5h4yO-k=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/TIT2HNQO7VDC5BT5G4AIVF7TDE.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/VU-ki9mvdks706lnaztkKIfDk0k=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/TIT2HNQO7VDC5BT5G4AIVF7TDE.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '96175e50c00d3a086a465d5b73f214cab5910ebc8821fe716189526a4719f20b'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fuw1j8lnRl1OP'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema11',
        sectionWeb: 'Bloque_6'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema11',
        information: {
            layout: 'focalLeft3',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'AO7S7RK6JNF3ZFXZJU5PU3FQ64',
            title: 'Deportes',
            url: 'https://www.lanacion.com.ar/deportes/',
            imageId: 'PKOHGOEKMVBMZBE4M6NENMEMOQ',
            image: {
                promo_items: {
                    basic: {
                        _id: 'PKOHGOEKMVBMZBE4M6NENMEMOQ',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/CBgIlSP9Z-7FaCtp2y4RWWqAPJE=/arc-anglerfish-arc2-prod-lanacionar/public/PKOHGOEKMVBMZBE4M6NENMEMOQ.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'deportes.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/PKOHGOEKMVBMZBE4M6NENMEMOQ.png',
                            owner: 'mralcobendas@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/CBgIlSP9Z-7FaCtp2y4RWWqAPJE=/arc-anglerfish-arc2-prod-lanacionar/public/PKOHGOEKMVBMZBE4M6NENMEMOQ.png',
                            published: true,
                            resizeUrl:
                                '/resizer/CBgIlSP9Z-7FaCtp2y4RWWqAPJE=/arc-anglerfish-arc2-prod-lanacionar/public/PKOHGOEKMVBMZBE4M6NENMEMOQ.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/6xmbQz0jAeITAtotpVTM35RLIwE=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/PKOHGOEKMVBMZBE4M6NENMEMOQ.png',
                            version: 0,
                            template_id: 707
                        },
                        address: {},
                        auth: {
                            '1':
                                '3b4e0b011f2b7480bb1ec39a9dee4791aa36097a0e46b4089cb5cb01f4d0942f'
                        },
                        caption: 'cabezal home Deportes',
                        created_date: '2021-06-08T22:35:36Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-06-08T22:35:36Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/onDopr_xmnQO_m0xR_lvvhN3P9c=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/PKOHGOEKMVBMZBE4M6NENMEMOQ.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/BEx09WpRGf56sot-KrcvXOL4MEs=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/PKOHGOEKMVBMZBE4M6NENMEMOQ.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '3a8ffca2a86c9e037945be28d62ac23dd9067cc32bebfe256bbcb1f2640f0a02'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fByyP2KUZybXY'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema11',
        sectionWeb: 'Bloque_6'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema12',
        information: {
            layout: 'focalLeft3',
            initialPosition: 1,
            hideTitle: false,
            idCollection: '6FJOYEPXWFB6ZMGHCONVJZODWA',
            title: 'Lifestyle',
            url: 'https://www.lanacion.com.ar/lifestyle/',
            imageId: '3IDLCADEO5AYHL3IGKT2OCR7DU',
            hideCaja: false,
            image: {
                promo_items: {
                    basic: {
                        _id: '3IDLCADEO5AYHL3IGKT2OCR7DU',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/IH-A3OnphEKmHAD6TGbNwcj-YZk=/arc-anglerfish-arc2-prod-lanacionar/public/3IDLCADEO5AYHL3IGKT2OCR7DU.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'lifestyle-home.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3IDLCADEO5AYHL3IGKT2OCR7DU.png',
                            owner: 'mralcobendas@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/IH-A3OnphEKmHAD6TGbNwcj-YZk=/arc-anglerfish-arc2-prod-lanacionar/public/3IDLCADEO5AYHL3IGKT2OCR7DU.png',
                            published: true,
                            resizeUrl:
                                '/resizer/IH-A3OnphEKmHAD6TGbNwcj-YZk=/arc-anglerfish-arc2-prod-lanacionar/public/3IDLCADEO5AYHL3IGKT2OCR7DU.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/mhnjpFIFeZojHNpwBmNWGt5Q1Zo=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/3IDLCADEO5AYHL3IGKT2OCR7DU.png',
                            version: 0,
                            template_id: 707
                        },
                        address: {},
                        auth: {
                            '1':
                                '167c4c0425ec98a515aed77c2a6bb0a888821b2eb94f793231413440d34e90f1'
                        },
                        caption: 'cabezal lifestyle home',
                        created_date: '2021-06-08T22:51:06Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-06-08T22:51:06Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/W33lhEo7ci2zHyT4o9tJpSl8eN4=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3IDLCADEO5AYHL3IGKT2OCR7DU.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/U4kWMWlIvjRsBjY0YaUNccyPBus=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3IDLCADEO5AYHL3IGKT2OCR7DU.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    '9087d257aff2f52f13e7bfd0ba9c7c1b699ac75b14370bccf2dc9ac15f71df3c'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fchSg5A5DtaJh'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema12',
        sectionWeb: 'Bloque_7'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema12',
        information: {
            layout: 'grilla2',
            initialPosition: 4,
            hideTitle: false,
            idCollection: '6FJOYEPXWFB6ZMGHCONVJZODWA',
            hideCaja: false,
            title: '',
            imageId: '',
            url: '',
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fE0n6Cv3Qb402'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema12',
        sectionWeb: 'Bloque_7'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema13',
        information: {
            layout: 'grilla6',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'EUNXJ3BW7NGXFB3ZS7YGPBOYUA',
            title: 'Hashtag',
            imageId: 'ZZEXVFIL2ZFHBIQVL7GN632OXU',
            hideCaja: false,
            url: '',
            image: {
                promo_items: {
                    basic: {
                        _id: 'ZZEXVFIL2ZFHBIQVL7GN632OXU',
                        additional_properties: {
                            fullSizeResizeUrl:
                                '/resizer/4ZglkroL48ure4GPGXpbb5_R1Z4=/arc-anglerfish-arc2-prod-lanacionar/public/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            galleries: [],
                            ingestionMethod: 'manual',
                            mime_type: 'image/png',
                            originalName: 'hashtag-home.png',
                            originalUrl:
                                'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            owner: 'mralcobendas@lanacion.com.ar',
                            proxyUrl:
                                '/resizer/4ZglkroL48ure4GPGXpbb5_R1Z4=/arc-anglerfish-arc2-prod-lanacionar/public/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            published: true,
                            resizeUrl:
                                '/resizer/4ZglkroL48ure4GPGXpbb5_R1Z4=/arc-anglerfish-arc2-prod-lanacionar/public/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            restricted: false,
                            thumbnailResizeUrl:
                                '/resizer/dG-IMjs8zsUqS04W2bt7A6LzwsU=/300x0/arc-anglerfish-arc2-prod-lanacionar/public/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                            version: 0,
                            template_id: 707
                        },
                        address: {},
                        auth: {
                            '1':
                                'a8b68d452c2dfd72e46c0bb1a34cb458b55cf76f911a841f39ec409e5a4ba043'
                        },
                        caption: 'cabezal home hashtag',
                        created_date: '2021-06-10T22:03:23Z',
                        credits: {
                            affiliation: []
                        },
                        height: 513,
                        image_type: 'photograph',
                        last_updated_date: '2021-06-10T22:03:23Z',
                        licensable: false,
                        owner: {
                            id: 'lanacionar',
                            sponsored: false
                        },
                        source: {
                            additional_properties: {
                                editor: 'photo center'
                            },
                            edit_url: '',
                            system: 'photo center'
                        },
                        taxonomy: {
                            associated_tasks: []
                        },
                        type: 'image',
                        url:
                            'https://resizer.glanacion.com/resizer/YOCCSvhbiAE13yWk1uZMQGHc3XA=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                        version: '0.10.3',
                        width: 768,
                        syndication: {},
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/GSTdEEwicyf0Vw-4NiRxmImGfoA=/222x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/ZZEXVFIL2ZFHBIQVL7GN632OXU.png',
                                option: {
                                    width: 222,
                                    height: 160,
                                    media: '(min-width: 1024px)'
                                }
                            }
                        ],
                        resized_urls_zoom: []
                    }
                },
                _id:
                    'ab746ac28316b2d07c02450e342f46141c81f307d0b1ace28e025f1b8badb855'
            },
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0fnm4LUuSYvaMF'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema13',
        sectionWeb: 'Bloque_8'
    },
    {
        type: 0,
        sectionAliasMobile: 'Tema13',
        information: {
            layout: 'grilla2',
            initialPosition: 1,
            hideTitle: false,
            idCollection: 'ZWOGJFYWONARTGN4DE2Q4YGB5U',
            hideCaja: false,
            title: 'Recetas',
            url: 'https://www.lanacion.com.ar/recetas/',
            nameChain: 'Ln_Caja_Collection',
            idRender: 'c0f7QIY42I5s1o9'
        },
        articles: articlesCollections,
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Tema13',
        sectionWeb: 'Bloque_8'
    },
    {
        type: 2,
        sectionAliasMobile: 'AnexoMobile',
        information: {
            hideCaja: false,
            layout: 'grilla1',
            nameFeature: 'LN-common/anexoMobile',
            idRender: 'f0fUaZHHjjvC7JX'
        },
        articles: [
            {
                url:
                    'https://especialess3.lanacion.com.ar/interactivos/22/08/anexos-calculadora-mundial-2022-v07/',
                alto: 236
            }
        ],
        configurations: {
            arcSite: 'la-nacion-ar'
        },
        sectionMobile: 'Anexo',
        sectionWeb: 'App_Anexo_1'
    }
];
