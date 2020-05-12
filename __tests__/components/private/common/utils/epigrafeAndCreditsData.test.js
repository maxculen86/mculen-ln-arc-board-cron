import EpigrafeAndCreditsData from '../../../../../components/private/common/utils/epigrafeAndCreditsData';

describe('Common - EpigrafeAndCreditsData', () => {
    const parameterTest = {
        credits: {
            by: [
                {
                    byline: 'martin Lopez',
                    name: 'martin Lopez',
                    type: 'author'
                }
            ]
        },
        distributor: {
            category: 'staff',
            mode: 'custom',
            name: 'Tincho'
        }
    };
    test('EpigrafeAndCreditsData', () => {
        expect(EpigrafeAndCreditsData(parameterTest)).toStrictEqual(
            'Fuente: Tincho - Crédito: martin Lopez'
        );
    });
});
