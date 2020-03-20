import validateLayoutChildren from './../../../../components/layouts/validations/LN-home-validation.js';
import config from './../../../../components/layouts/config/LN-home.config';

describe('Test de funcionalidad LN-home-validation del layout - <LNHomeLayout />', () => {
    const renderablesWithoutErrors = [
        {
            collection: 'layouts',
            type: 'LN-home',
            props: {
                key: 'LN-home',
                collection: 'layouts',
                type: 'LN-home',
                childProps: [{}, {}]
            },
            children: [{}, {}]
        },
        {
            collection: 'sections',
            props: { key: 0, collection: 'sections', id: 0 },
            children: [
                {
                    collection: 'chains',
                    type: 'apertura',
                    props: {},
                    children: [{}, {}, {}, {}, {}, {}]
                }
            ]
        },
        {
            collection: 'sections',
            props: { key: 1, collection: 'sections', id: 1 },
            children: [
                {
                    collection: 'chains',
                    type: 'cajaTema',
                    props: {},
                    children: [{}, {}, {}]
                }
            ]
        }
    ];

    const responseWithoutErrors = [[], []];

    const renderablesWithErrors = [
        {
            collection: 'layouts',
            type: 'LN-home',
            props: {
                key: 'LN-home',
                collection: 'layouts',
                type: 'LN-home',
                childProps: [{}, {}]
            },
            children: [{}, {}]
        },
        {
            collection: 'sections',
            props: { key: 0, collection: 'sections', id: 0 },
            children: [
                {
                    collection: 'chains',
                    type: 'cajaTema',
                    props: {},
                    children: [{}, {}, {}, {}, {}, {}]
                }
            ]
        },
        {
            collection: 'sections',
            props: { key: 1, collection: 'sections', id: 1 },
            children: [
                {
                    collection: 'chains',
                    type: 'apertura',
                    props: {},
                    children: [{}, {}, {}]
                }
            ]
        }
    ];

    const responseWithErrors = [
        [
            {
                type: 'warning',
                message:
                    'El Chain cajaTema no es soportado por la Sección Apertura'
            }
        ],
        [
            {
                type: 'warning',
                message:
                    'El Chain apertura no es soportado por la Sección Caja de Tema'
            }
        ]
    ];

    it('Función validateLayoutChildren con renderables permitidos', () => {
        expect(
            validateLayoutChildren(renderablesWithoutErrors, config)
        ).toEqual(responseWithoutErrors);
    });
    it('Función validateLayoutChildren con renderables no permitidos', () => {
        expect(validateLayoutChildren(renderablesWithErrors, config)).toEqual(
            responseWithErrors
        );
    });
});
