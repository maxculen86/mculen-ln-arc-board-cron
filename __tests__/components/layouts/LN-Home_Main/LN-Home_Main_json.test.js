
import * as fusionConsumer from 'fusion:consumer';
import * as LayoutLNMainHome from '../../../../components/layouts/LN-Home_Main/json';
import home from '../../../../components/private/LN/api/v1/global/home';
import pageBuilderSections from '../../../../components/layouts/config/LN-PageBuilder.config.json';
import propsAppAnexos from '../../../../__mocks__/data/renderables/dataAppAnexos';
import propsAppAnexo1 from '../../../../__mocks__/data/renderables/dataAppAnexo1';
import propsAppAnexo2 from '../../../../__mocks__/data/renderables/dataAppAnexo2';
import propsAppAnexowithoutApertura from '../../../../__mocks__/data/renderables/dataAppAnexoswithoutApertura';
import propsApertura from '../../../../__mocks__/data/renderables/dataApertura.json';
import propsAperturaTimeline from '../../../../__mocks__/data/renderables/dataAperturaTimeline.json';

jest.mock('.../../../../../../components/private/LN/api/v1/global/home', () => {
    return function(component) {
        return component;
    };
});

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

describe('components - layouts - LN-Home_Main - json', () => {
    const props = {};
    props.id = 'LN-Home_Main';
    props.isAdmin = false;
    props.layout = 'LN-Home_Main';
    let children = [
        [], //0 Anticipo',
        [], //1 Anexo',
        [], //2 Bomba',
        [], //3 Apertura',
        [], //4 Apertura',
        [], //5 Multimedia',
        [], //6 Anexo
        [], //7 Tema1',
        [], //8 Tema2',
        [], //9 Tema3',
        [], //10 Anexo',
        [], //11 Opinion',
        [], //12 Tema4',
        [], //13 Tema5',
        [], //14 Tema6',
        [], //15 Comercial',
        [], //16 Tema7',
        [], //17 Comercial',
        [], //18 Tema8',
        [], //19 Tema9',
        [], //20 Tema10',
        [], //21 Tema11',
        [], //22 Tema12',
        [], //23 Tema13',
        [], //24 App_Anexo_1',
        [] //25 App_Anexo_2'
    ];

    props.renderables = [];
    props.arcSite = 'la-nacion-ar';

    describe('Test Section Anticipo', () => {
        test('OK', () => {
            const childrenTmp = children;
            childrenTmp[0] = [
                {
                    information: {
                        hideCaja: false,
                        title: 'abc',
                        url:
                            'https://www.cotodigital3.com.ar/sitios/cdigi/?utm_source=lanacion&utm_medium=display&utm_campaign=ofertas'
                    }
                }
            ];
            props.children = childrenTmp;
            props.renderables = [
                {
                    collection: 'sections',
                    props: {
                        collection: 'sections',
                        id: 0
                    },
                    children: [
                        {
                            collection: 'features',
                            type: 'LN-common/cajaAnticipo',
                            props: {}
                        }
                    ]
                },
                {}
            ];
            const homeSections = LayoutLNMainHome.default(props);
            expect(homeSections).not.toBeNull();
        });
    });


});
