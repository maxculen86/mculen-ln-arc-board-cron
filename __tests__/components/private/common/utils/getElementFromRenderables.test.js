import { getMockRenderables } from '../../../../../__mocks__/data/renderables/renderablesForPreload';
import getElementFromRenderables from '../../../../../components/private/common/utils/getElementFromRenderables';
import sectionsConfigLN10 from '../../../../../components/layouts/config/LN10-Home.config.json';

const resultBombaLN10 = getMockRenderables()[2].children[2];
const resultCajaAperturaLN10 = getMockRenderables()[3].children[0];
const resultCajaCollectionLN10 = getMockRenderables()[3].children[1];

describe('Tests function getElementFromRenderables', () => {
    const propsByOpening = {
        position: 'Apertura.position',
        config: sectionsConfigLN10,
        typeElement: 'LN10_Caja_Apertura',
        renderables: getMockRenderables(),
        propNameHide: 'hideCaja'
    };

    const propsByBomba = {
        position: 'Pre_Apertura.position',
        config: sectionsConfigLN10,
        typeElement: 'LN10_Caja_Bomba',
        renderables: getMockRenderables(),
        propNameHide: 'hideCaja'
    };

    const propsByCollection = {
        ...propsByOpening,
        propNameHide: 'hideCaja',
        typeElement: 'LN10_Caja_Collection'
    };

    test('should return null when the parameters is not defined', () => {
        expect(getElementFromRenderables()).toBeNull();
    });

    test('should return chain LN10_Caja_Bomba', () => {
        expect(getElementFromRenderables(propsByBomba)).toStrictEqual(
            resultBombaLN10
        );
    });

    test('should return chain LN10_Caja_Apertura', () => {
        expect(getElementFromRenderables(propsByOpening)).toStrictEqual(
            resultCajaAperturaLN10
        );
    });

    test('should return chain LN10_Caja_Collection', () => {
        expect(getElementFromRenderables(propsByCollection)).toStrictEqual(
            resultCajaCollectionLN10
        );
    });

    const casesNull = [
        ['should return null when the parameters is not defined', undefined],
        [
            'should return null when is Opening hidden',
            {
                ...propsByOpening,
                renderables: getMockRenderables({ hideApertura: true })
            }
        ],
        [
            'should return null when is Bomba hidden',
            {
                ...propsByBomba,
                renderables: getMockRenderables({ hideBomba: true })
            }
        ],
        [
            'should return null when is collection hidden',
            {
                ...propsByCollection,
                renderables: getMockRenderables({ hideCollection: true })
            }
        ]
    ];

    test.each(casesNull)('%s', (message, props) => {
        expect(getElementFromRenderables(props)).toBeNull();
    });
});
