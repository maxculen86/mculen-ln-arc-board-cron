import validateSponsoredLink from '../../../../content/sources/utils/validateSponsoredLink';

describe('Test - validateSponsoredLink', () => {
    const casesFalsy = [
        [
            'It should return false when the kicker and label is not.',
            {
                label: {
                    enlaces_patrocinados: {
                        display: true,
                        text: 'no'
                    }
                }
            }
        ],
        [
            'It should return false when the kicker and label is not defined.',
            {
                label: {
                    enlaces_patrocinados: undefined
                }
            }
        ],
        ['It should return false when data is not defined.', undefined]
    ];

    test.each(casesFalsy)('%s', (message, data) => {
        const withSponsoredLink = validateSponsoredLink(data);
        expect(withSponsoredLink).toBeFalsy();
    });

    test('Should return true when kicker and label is yes', () => {
        const data = {
            label: {
                enlaces_patrocinados: {
                    display: true,
                    text: 'si'
                }
            }
        };
        expect(validateSponsoredLink(data)).toBeTruthy();
    });
});
