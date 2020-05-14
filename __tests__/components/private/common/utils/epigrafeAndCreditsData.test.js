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
});
