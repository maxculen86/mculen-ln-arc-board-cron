import validateLayoutChildren from './../../../../components/layouts/validations/LN-home-validation.js';
import config from './../../../../components/layouts/config/LN-home.config';
import { getChainsFromApertura } from '../../../../components/private/LN/common/utils/homeHelper.js';
import Ln_Caja_Collection from '../../../../components/chains/Ln_Caja_Collection/default';
import Ln_Caja_Manual from '../../../../components/chains/Ln_Caja_Manual/default';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

import Consumer from 'fusion:consumer';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

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
        },
        {
            collection: 'sections',
            props: { key: 2, collection: 'sections', id: 2 },
            children: [
                {
                    collection: 'chains',
                    type: 'cajaTema',
                    props: {},
                    children: [{}, {}, {}]
                }
            ]
        },
        {
            collection: 'sections',
            props: { key: 3, collection: 'sections', id: 3 },
            children: [
                {
                    collection: 'chains',
                    type: 'Ln_Caja_Collection',
                    props: {},
                    children: [{}, {}, {}]
                },
                {
                    collection: 'chains',
                    type: 'Ln_Caja_Manual',
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
                    'El componente cajaTema no es soportado por la Sección Apertura'
            }
        ],
        [
            {
                type: 'warning',
                message:
                    'El componente apertura no es soportado por la Sección Caja de Tema'
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

    it('Deberia capturar 2 chains de la seccion apertura a partir del renderable', () => {
        const { chainApertura1, chainApertura2 } = getChainsFromApertura(renderablesWithoutErrors);        
        expect(chainApertura1).toBeTruthy();
        expect(chainApertura2).toBeTruthy();
    });

    it('Deberia devolver nulo las chain de seccion apertura a partir del renderable', () => {
        const { chainApertura1, chainApertura2 } = getChainsFromApertura([]);
        expect(chainApertura1).toBeFalsy();
        expect(chainApertura2).toBeFalsy();
    });
    
});
