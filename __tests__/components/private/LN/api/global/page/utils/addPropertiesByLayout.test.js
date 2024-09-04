import addPropertiesByLayout from '../../../../../../../../components/private/LN/api/global/page/utils/addPropertiesByLayout';
import paramsForFirstTransform from '../../../../../../../../__mocks__/data/homes/paramsForFirstTransform.json';
import configOrderArticlesbyDiagramation from '../../../../../../../../components/private/LN/api/global/page/config/configOrderArticlesbyDiagramation';
import configDiagramationsByLayout from '../../../../../../../../components/private/LN/api/global/page/config/configDiagramationsByLayout';
import responsesForFirstTransform from '../../../../../../../../__mocks__/data/homes/responsesForFirstTransform.json';

const layoutPage = 'LN10-Home_Main';
const positionsArticlesbyDiagramation = configOrderArticlesbyDiagramation(
    layoutPage
);
const diagramations = configDiagramationsByLayout(layoutPage);
let paramSectionChildren = {};
let paramElement = {};

describe('components - private - LN - api - global - page - utils  - addPropertiesByLayout', () => {
    it('When Section have LN10_Caja_Manual / LN-common/anexo / LN10_Caja_Collection', () => {
        paramSectionChildren =
            paramsForFirstTransform.paramsFirstTransform[3].sectionChildren;
        paramElement = paramsForFirstTransform.paramsFirstTransform[3].elements;
        const elements = addPropertiesByLayout(
            paramSectionChildren,
            paramElement,
            diagramations,
            positionsArticlesbyDiagramation
        );
        expect(elements[0].information).toMatchObject({
            layout: 'bn_1_1_grid',
            initialPosition: 1,
            hideTitle: false,
            hideCaja: false,
            title: 'Jubilaciones',
            url: 'https://www.lanacion.com.ar/ultimas-noticias/',
            pbInternal_cloneId: 'c0fxxnmdKocy1dC',
            idCollection: 'FEZ4PS5MWFCJTML4CWRNSI5NZ4',
            link: '',
            noteId: '',
            buttonText: '',
            linkButton: '',
            buttonStyle: null,
            typeChain: null,
            nameChain: 'LN10_Caja_Manual',
            idRender: 'c0fxxnmdKocy1dC'
        });

        expect(elements[9].information).toMatchObject({
            layout: 'bn_6_timeline',
            initialPosition: 1,
            hideTitle: false,
            hideCaja: false,
            title: 'LN+',
            url: 'https://www.lanacion.com.ar/ultimas-noticias/',
            pbInternal_cloneId: 'c0fOjLLHuwHz1uw',
            idCollection: 'MBO7S2ZP5BHIBE7O7EVZHKKTIE',
            link: 'https://lnmas.lanacion.com.ar/ ',
            buttonLogo: '',
            buttonStyle: 'ln',
            navigator: '',
            logoId: '4TG27TOYBZD63ITSLETG3PEZTU',
            buttonText: 'Ver en vivo',
            linkButton: 'https://lnmas.lanacion.com.ar/ ',
            typeChain: null,
            nameChain: 'LN10_Caja_Collection',
            idRender: 'c0fOjLLHuwHz1uw'
        });
    });

    it('When Section have LN-common/LN10_anticipo', () => {
        paramSectionChildren =
            paramsForFirstTransform.paramsFirstTransform[1].sectionChildren;
        paramElement = paramsForFirstTransform.paramsFirstTransform[1].elements;
        const elements = addPropertiesByLayout(
            paramSectionChildren,
            paramElement,
            diagramations,
            positionsArticlesbyDiagramation
        );
        expect(elements[0].information).toMatchObject(
            responsesForFirstTransform.responses[1][0].information
        );
    });

    it('When Section have to moveElements', () => {
        const sectionChildrenToMove = [
            {
                collection: 'chains',
                type: 'LN10_Caja_Apertura',
                props: {
                    collection: 'chains',
                    type: 'LN10_Caja_Apertura',
                    id: 'c0f6GzTNZOut1OY',
                    name: null,
                    customFields: {
                        layout: 'grilla3',
                        hideCaja: false
                    },
                    displayProperties: {}
                },
                children: [
                    {
                        collection: 'features',
                        type: 'LN-10/article',
                        props: {
                            collection: 'features',
                            type: 'LN-10/article',
                            id: 'f0ftDIjrVWEL1b2',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: 'DZPNLYDUYJDOLB3BAXM3UIIGNQ',
                                variant: null,
                                hideImage: false,
                                pbInternal_cloneId: 'f0f7xLx0bGywLX',
                                imageId: '',
                                title: '',
                                video: '',
                                hideDescription: false,
                                chapita: '',
                                chapitaStyle: null,
                                lead: '',
                                authors: '',
                                layout: 'bnGrilla4',
                                description: '',
                                html: '',
                                hideAuthors: false
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    },
                    {
                        collection: 'features',
                        type: 'LN-10/article',
                        props: {
                            collection: 'features',
                            type: 'LN-10/article',
                            id: 'f0fU8aAgQ0M2Vn',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: '67H5EIW2HJG2JCR4ILHYDUBU5Q',
                                variant: 'regular',
                                hideImage: false,
                                pbInternal_cloneId: 'f0fU8aAgQ0M2Vn',
                                imageId: '',
                                title: '',
                                video: '',
                                hideDescription: false,
                                chapita: '',
                                chapitaStyle: null,
                                lead: '',
                                authors: '',
                                layout: 'bnGrilla4',
                                description: '',
                                html: '',
                                hideAuthors: false
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    },
                    {
                        collection: 'features',
                        type: 'LN-10/article',
                        props: {
                            collection: 'features',
                            type: 'LN-10/article',
                            id: 'f0f6wQEtVWEL11V',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: 'DOAN3PLWBBDOTCY67CGSXGXRGA',
                                variant: 'regular',
                                hideImage: false,
                                pbInternal_cloneId: 'f0fMLqe1AsFFDd',
                                imageId: '',
                                title: '',
                                video: '',
                                hideDescription: false,
                                chapita: '',
                                chapitaStyle: null,
                                lead: '',
                                authors: '',
                                layout: 'bnGrilla4',
                                description: '',
                                html: '',
                                hideAuthors: false
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    },
                    {
                        collection: 'features',
                        type: 'LN-10/article',
                        props: {
                            collection: 'features',
                            type: 'LN-10/article',
                            id: 'f0fMLqe1AsFFDd',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: '5DFK5W3D2ZBTXFRDCLDGUSXMLY',
                                variant: 'regular',
                                hideImage: false,
                                pbInternal_cloneId: 'f0fMLqe1AsFFDd',
                                imageId: '',
                                title: '',
                                video: '',
                                hideDescription: false,
                                chapita: '',
                                chapitaStyle: null,
                                lead: '',
                                authors: '',
                                layout: 'bnGrilla4',
                                description: '',
                                html: '',
                                hideAuthors: false
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    },
                    {
                        collection: 'features',
                        type: 'LN-10/article',
                        props: {
                            collection: 'features',
                            type: 'LN-10/article',
                            id: 'f0fAhRlPz0XW2qe',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                noteId: 'WDZW5HTBHNDAXALEZQKJH6HPMY',
                                variant: 'regular',
                                hideImage: false,
                                pbInternal_cloneId: 'f0fAhRlPz0XW2qe',
                                imageId: '',
                                title: '',
                                video: '',
                                hideDescription: false,
                                chapita: '',
                                chapitaStyle: null,
                                lead: '',
                                authors: '',
                                layout: 'bnGrilla4',
                                description: '',
                                html: ''
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    },
                    {
                        collection: 'features',
                        type: 'LN-10/timeline',
                        props: {
                            collection: 'features',
                            type: 'LN-10/timeline',
                            id: 'f0fl7uZIzoK2agg',
                            name: null,
                            contentConfig: {
                                contentService: '',
                                contentConfigValues: {},
                                inherit: true
                            },
                            customFields: {
                                size: 5,
                                sectionTagType: 'section',
                                sectionTagValue: '',
                                collectionId: '',
                                url: '',
                                title: 'Últimas noticias',
                                hideTitle: false,
                                source: 'byLastNews',
                                sections: [
                                    '/politica',
                                    '/economia',
                                    '/el-mundo',
                                    '/sociedad',
                                    '/seguridad',
                                    '/deportes'
                                ]
                            },
                            displayProperties: {},
                            localEdits: {},
                            variants: {}
                        }
                    }
                ]
            }
        ];

        const elementToMove = [
            {
                information: {
                    layout: 'grilla3',
                    hideCaja: false,
                    typeChain: 'apertura',
                    nameChain: 'LN10_Caja_Apertura',
                    idRender: 'c0f6GzTNZOut1OY'
                },
                articles: [
                    {
                        _id: 'DZPNLYDUYJDOLB3BAXM3UIIGNQ',
                        additionalProperties: {
                            noteId: 'DZPNLYDUYJDOLB3BAXM3UIIGNQ',
                            title: '',
                            authors: '',
                            lead: '',
                            chapita: '',
                            image: null,
                            video: null,
                            html: '',
                            variant: null,
                            chapitaStyle: null,
                            description: '',
                            hideDescription: false,
                            idRender: 'f0ftDIjrVWEL1b2',
                            originPosition: 'T1',
                            nameFeature: 'LN-10/article'
                        }
                    },
                    {
                        _id: '67H5EIW2HJG2JCR4ILHYDUBU5Q',
                        website_url:
                            '/economia/negocios/maxima-expectativa-empresaria-por-la-llegada-de-milei-a-la-uia-nid02092024/',
                        withFirmaDistributor: false,
                        withSponsoredLink: false,
                        additionalProperties: {
                            noteId: '67H5EIW2HJG2JCR4ILHYDUBU5Q',
                            title: '',
                            authors: '',
                            lead: '',
                            chapita: '',
                            image: null,
                            video: null,
                            html: '',
                            variant: 'regular',
                            chapitaStyle: null,
                            description: '',
                            hideDescription: false,
                            idRender: 'f0fU8aAgQ0M2Vn',
                            originPosition: 'T2',
                            nameFeature: 'LN-10/article'
                        }
                    },
                    {
                        _id: 'DOAN3PLWBBDOTCY67CGSXGXRGA',
                        website_url:
                            '/el-mundo/estados-unidos-confisco-el-avion-de-nicolas-maduro-en-republica-dominicana-nid02092024/',
                        withFirmaDistributor: false,
                        withSponsoredLink: false,
                        additionalProperties: {
                            noteId: 'DOAN3PLWBBDOTCY67CGSXGXRGA',
                            title: '',
                            authors: '',
                            lead: '',
                            chapita: '',
                            image: null,
                            video: null,
                            html: '',
                            variant: 'regular',
                            chapitaStyle: null,
                            description: '',
                            hideDescription: false,
                            idRender: 'f0f6wQEtVWEL11V',
                            originPosition: 'T3',
                            nameFeature: 'LN-10/article'
                        }
                    },
                    {
                        _id: '5DFK5W3D2ZBTXFRDCLDGUSXMLY',
                        website_url:
                            '/economia/impuesto-pais-comenzo-a-bajar-el-precio-de-los-autos-y-se-esperan-mas-reducciones-aunque-algunos-nid02092024/',
                        withFirmaDistributor: false,
                        withSponsoredLink: false,
                        additionalProperties: {
                            noteId: '5DFK5W3D2ZBTXFRDCLDGUSXMLY',
                            title: '',
                            authors: '',
                            lead: '',
                            chapita: '',
                            image: null,
                            video: null,
                            html: '',
                            variant: 'regular',
                            chapitaStyle: null,
                            description: '',
                            hideDescription: false,
                            idRender: 'f0fMLqe1AsFFDd',
                            originPosition: 'T4',
                            nameFeature: 'LN-10/article'
                        }
                    },
                    {
                        _id: 'WDZW5HTBHNDAXALEZQKJH6HPMY',
                        website_url:
                            '/politica/criticas-al-nuevo-decreto-de-javier-milei-que-restringe-el-acceso-a-la-informacion-publica-nid02092024/',
                        withFirmaDistributor: true,
                        withSponsoredLink: false,
                        additionalProperties: {
                            noteId: 'WDZW5HTBHNDAXALEZQKJH6HPMY',
                            title: '',
                            authors: '',
                            lead: '',
                            chapita: '',
                            image: null,
                            video: null,
                            html: '',
                            variant: 'regular',
                            chapitaStyle: null,
                            description: '',
                            hideDescription: false,
                            idRender: 'f0fAhRlPz0XW2qe',
                            originPosition: 'T5',
                            nameFeature: 'LN-10/article'
                        }
                    },
                    {
                        information: {
                            size: 5,
                            sectionTagType: 'section',
                            sectionTagValue: '',
                            collectionId: '',
                            url: '',
                            title: 'Últimas noticias',
                            hideTitle: false,
                            source: 'byLastNews',
                            sections: [
                                '/politica',
                                '/economia',
                                '/el-mundo',
                                '/sociedad',
                                '/seguridad',
                                '/deportes'
                            ],
                            layout: 'timeline',
                            image: null,
                            nameFeature: 'LN-10/timeline',
                            idRender: 'f0fl7uZIzoK2agg',
                            idRenderParent: 'c0f6GzTNZOut1OY'
                        },
                        articles: [
                            {
                                _id: 'SSV6QENXOFBD3I6KHOCTU6OPVY',
                                website_url:
                                    '/economia/domingo-cavallo-el-cepo-dificulta-la-refinanciacion-de-la-deuda-en-dolares-nid03092024/',
                                additionalProperties: {
                                    noteId: 'SSV6QENXOFBD3I6KHOCTU6OPVY',
                                    title: null,
                                    image: null,
                                    video: null,
                                    idRender: null,
                                    originPosition: 'T1',
                                    nameFeature: null
                                }
                            },
                            {
                                _id: '3XRTT4NMEJHM3PW7UWFJPAMJBE',
                                website_url:
                                    '/economia/negocios/1-de-cada-20-las-billeteras-digitales-ganan-terreno-y-le-roban-participacion-a-los-bancos-nid03092024/',
                                additionalProperties: {
                                    noteId: '3XRTT4NMEJHM3PW7UWFJPAMJBE',
                                    title: null,
                                    image: null,
                                    video: null,
                                    idRender: null,
                                    originPosition: 'T2',
                                    nameFeature: null
                                }
                            },
                            {
                                _id: 'Q7KS245OGRAETGKKAWEWMBCIY4',
                                website_url:
                                    '/seguridad/operativo-en-la-cava-cayeron-la-gorda-agus-y-mauri-los-narcos-detras-una-zona-caliente-de-venta-de-nid03092024/',
                                additionalProperties: {
                                    noteId: 'Q7KS245OGRAETGKKAWEWMBCIY4',
                                    title: null,
                                    image: null,
                                    video: null,
                                    idRender: null,
                                    originPosition: 'T3',
                                    nameFeature: null
                                }
                            },
                            {
                                _id: 'XWKWD3D4IVBBFMZCDMBCCM3VYE',
                                website_url:
                                    '/seguridad/a-57-dias-de-su-detencion-los-rugbiers-franceses-fueron-autorizados-a-volver-a-paris-nid03092024/',
                                additionalProperties: {
                                    noteId: 'XWKWD3D4IVBBFMZCDMBCCM3VYE',
                                    title: null,
                                    image: null,
                                    video: null,
                                    idRender: null,
                                    originPosition: 'T4',
                                    nameFeature: null
                                }
                            },
                            {
                                _id: 'MIYJ6Q6R3BCA5EZVWDBIG7TDB4',
                                website_url:
                                    '/politica/quintela-dijo-que-podria-haber-un-enardecimiento-de-la-sociedad-que-no-se-podra-parar-o-juicio-nid03092024/',
                                additionalProperties: {
                                    noteId: 'MIYJ6Q6R3BCA5EZVWDBIG7TDB4',
                                    title: null,
                                    image: null,
                                    video: null,
                                    idRender: null,
                                    originPosition: 'T5',
                                    nameFeature: null
                                }
                            }
                        ]
                    }
                ]
            }
        ];

        const elements = addPropertiesByLayout(
            sectionChildrenToMove,
            elementToMove,
            diagramations,
            positionsArticlesbyDiagramation
        );
        expect(elements[0].articles[0]._id).toBe('DOAN3PLWBBDOTCY67CGSXGXRGA');
        expect(elements[0].articles[2]._id).toBe('67H5EIW2HJG2JCR4ILHYDUBU5Q');
    });
});
