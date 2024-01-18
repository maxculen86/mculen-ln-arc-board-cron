import getUserInitials from '../../../../../components/private/common/utils/getUserInitials';

describe('getUserInitials', () => {
    test('should return the initials of the names', () => {
        const result = getUserInitials('John', 'Doe');
        expect(result).toBe('JD');
    });

    test('should return the first two letters of the email in uppercase', () => {
        const result = getUserInitials('', '', 'test@example.com');
        expect(result).toBe('TE');
    });

    const casesEmptyString = [
        [
            'Should return an empty string when the first Name is not defined',
            ['', 'Diaz', '']
        ],
        [
            'Should return an empty string when the lastName is not defined',
            ['Juan', '', '']
        ],
        [
            'Should return an empty string when the props is not defined',
            [undefined]
        ]
    ];

    test.each(casesEmptyString)('%s', (message, props) => {
        expect(getUserInitials(...props)).toBe('');
    });
});
