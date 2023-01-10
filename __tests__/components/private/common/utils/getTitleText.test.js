import getTitleText from '../../../../../components/private/common/utils/getTitleText';

describe('Tests Function - getTitleText', () => {
    const headlines = {
        basic: 'Titulo largo',
        mobile: 'Titulo corto'
    };
    const label = {
        volanta: {
            text: 'Esta es la volanta'
        }
    };

    test('It should return the long title with "volanta".', () => {
        const headlines = {
            basic: 'Titulo largo'
        };

        expect(getTitleText(headlines, label)).toStrictEqual(
            'Esta es la volanta Titulo largo'
        );
    });

    test('It should return the short title with "volanta".', () => {
        expect(getTitleText(headlines, label)).toStrictEqual(
            'Esta es la volanta Titulo corto'
        );
    });

    test('should return the short title without "volanta"  when the label is not defined', () => {
        expect(getTitleText(headlines, undefined)).toStrictEqual(
            'Titulo corto'
        );
    });

    test('should return a empty string when the props is not defined', () => {
        expect(getTitleText()).toStrictEqual('');
    });
});
