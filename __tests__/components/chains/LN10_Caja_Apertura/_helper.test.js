import fusionConsumer from 'fusion:consumer';
import { setFilteredRenderables } from '../../../../components/chains/LN10_Caja_Apertura/common/_helper-WebApi';
import { setWrappedChildren } from '../../../../components/chains/utils/_helpers';

jest.mock('fusion:consumer', component => {
    return function (component) {
        return component;
    };
});

describe('components - chains - LN10_Caja_Apertura - helper', () => {
    const mock = {
        children: [
            { key: 'f0fecDmG9emTBJD' },
            { key: 'f0fKYEG3K2xTBOQ' },
            { key: 'f0fhs0XBrGzTBJ7' },
            { key: 'f0fzsFyju2CTBiA' },
            { key: 'f0fMFZoNOqPTBiy' },
            { key: 'f0fzP3Cp9qmyiY1', className: 'timeline-home' }
        ],
        renderables: [
            {
                type: 'LN10-Home_Main',
                props: { id: 'LN10-Home_Main' }
            },
            {
                type: 'LN-common/preHeader',
                props: { id: 'f0f1AFynjA6ZZg9' }
            },
            {
                type: 'LN10_Caja_Apertura',
                props: { id: 'c0fXGaWeSmetPoq' }
            },
            {
                type: 'LN10/LN10_articulo',
                props: { id: 'f0fecDmG9emTBJD' }
            },
            {
                type: 'LN10/LN10_articulo',
                props: { id: 'f0fKYEG3K2xTBOQ' }
            },
            {
                type: 'LN10/LN10_articulo',
                props: { id: 'f0fhs0XBrGzTBJ7' }
            },
            {
                type: 'LN10/LN10_articulo',
                props: { id: 'f0fzsFyju2CTBiA' }
            },
            {
                type: 'LN10/LN10_articulo',
                props: { id: 'f0fMFZoNOqPTBiy' }
            },
            {
                type: 'LN-acumulado/timeline',
                props: { id: 'f0fzP3Cp9qmyiY1' }
            }
        ]
    };

    describe('helper - setWrappedChildren', () => {
        test('should returns children features raws or with custom wrappers', () => {
            const features = setWrappedChildren(
                mock.renderables,
                mock.children
            );
            const childrenKeys = mock.children.map(child => child.key);
            const featuresKeys = features.map(({ key, props }) => {
                if (key) return key;
                const child = mock.children.find(
                    ({ className }) => className === props.className
                );

                return child.key;
            });

            expect(features).toHaveLength(mock.children.length);
            expect(featuresKeys).toEqual(childrenKeys);
        });

        test('should works with fallbacks', () => {
            const features = setWrappedChildren();

            expect(features).toHaveLength(0);
            expect(features).toEqual([]);
        });
    });

    describe('helper - setFilteredRenderables', () => {
        test('should returns only children features from renderables', () => {
            const children = setFilteredRenderables(
                mock.renderables,
                mock.children
            );
            const childrenKeys = children.map(child => child.props.id);
            const mockChildrenKeys = mock.children.map(
                mockChild => mockChild.key
            );

            expect(children).toHaveLength(mock.children.length);
            expect(childrenKeys).toEqual(mockChildrenKeys);
        });

        test('should works with fallbacks', () => {
            const features = setFilteredRenderables();

            expect(features).toHaveLength(0);
            expect(features).toEqual([]);
        });
    });
});
