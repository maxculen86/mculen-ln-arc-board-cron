import { validateLotteryLetters } from '../../../../../../content/sources/utils/servicesSource/lottery/lotteryHelper';

describe('content - sources - utils - lottery - lotteryHelper', () => {
    describe('ValidateLotteryLetters test', () => {
        const cases = [
            ['should return true', 'SJHDSA', true],
            ['should return false', 35435153, false],
            ['should return false', '654354', false],
            ['should return false', 'AS23SFD2', false],
            ['should return false', undefined, false],
            ['should return false', '', false]
        ];

        test.each(cases)('%s', (message, params, result) => {
            expect(validateLotteryLetters(params)).toBe(result);
        });
    });
});
