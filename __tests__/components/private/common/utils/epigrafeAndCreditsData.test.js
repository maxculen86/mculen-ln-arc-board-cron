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
        additional_properties: {
            iptc_source: 'LA NACION'
        }
    };
    test('EpigrafeAndCreditsData', () => {
        expect(EpigrafeAndCreditsData(parameterTest)).toStrictEqual(
            'martin Lopez - LA NACION'
        );
    });

    test('should handle undefined credits in by array', () => {
        const dataWithUndefinedCredit = {
            credits: {
                by: [undefined, null]
            },
            additional_properties: {
                iptc_source: 'LA NACION'
            }
        };
        expect(EpigrafeAndCreditsData(dataWithUndefinedCredit)).toStrictEqual(
            'LA NACION'
        );
    });

    test('should handle empty by array', () => {
        const dataWithEmptyBy = {
            credits: {
                by: []
            },
            additional_properties: {
                iptc_source: 'LA NACION'
            }
        };
        expect(EpigrafeAndCreditsData(dataWithEmptyBy)).toStrictEqual(
            'LA NACION'
        );
    });
});
