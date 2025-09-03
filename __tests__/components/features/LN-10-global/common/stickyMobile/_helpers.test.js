import {
    getComboIds,
    getComboTitles,
    getTitle
} from '../../../../../../components/features/LN-10-global/common/stickyMobile/_helpers';

const mk = (overrides = {}) => ({
    _id: overrides._id ?? '',
    headlines: overrides.headlines ?? {
        mobile: 'mobile-title',
        basic: 'basic-title'
    },
    ...overrides
});

describe('getComboIds', () => {
    it('concatenate ids in order with the default separator " | "', () => {
        const articles = [
            mk({ _id: 'A1' }),
            mk({ _id: 'B2' }),
            mk({ _id: 'C3' })
        ];
        expect(getComboIds(articles)).toBe('A1 | B2 | C3');
    });

    it('ommits articles without _id or null', () => {
        const articles = [
            mk({ _id: 'A1' }),
            {},
            null,
            mk({ _id: 'B2' }),
            mk(undefined),
            mk({ _id: 'C3' })
        ];
        expect(getComboIds(articles)).toBe('A1 | B2 | C3');
    });

    it('accepts numeric and string _id ', () => {
        const articles = [
            mk({ _id: 111 }),
            mk({ _id: '222' }),
            mk({ _id: 333 })
        ];
        expect(getComboIds(articles)).toBe('111 | 222 | 333');
    });

    it('use custom separator when it is provided', () => {
        const articles = [
            mk({ _id: 'A1' }),
            mk({ _id: 'B2' }),
            mk({ _id: 'C3' })
        ];
        expect(getComboIds(articles, ', ')).toBe('A1, B2, C3');
    });

    it('returns empty chain for empty list or not valid ids', () => {
        expect(getComboIds([])).toBe('');
        expect(getComboIds([{}, null, undefined])).toBe('');
    });
});

describe('getTitle', () => {
    it('prefers headlines.mobile over basic', () => {
        const art = mk({ headlines: { mobile: 'M1', basic: 'B1' } });
        expect(getTitle(art)).toBe('M1');
    });

    it('gets headlines.basic if there is no mobile', () => {
        const art = mk({ headlines: { mobile: '', basic: 'B1' } });
        expect(getTitle(art)).toBe('B1');
    });

    it('returns empty if there is no headlines', () => {
        expect(getTitle({})).toBe('');
        expect(getTitle(null)).toBe('');
    });
});

describe('getComboTitles', () => {
    it('concatenates titles with separator " | "', () => {
        const arts = [
            mk({ headlines: { mobile: 'M1', basic: 'B1' } }),
            mk({ headlines: { mobile: '', basic: 'B2' } }),
            mk({ headlines: { mobile: 'M3', basic: 'B3' } })
        ];
        expect(getComboTitles(arts)).toBe('M1 | B2 | M3');
    });

    it('returns empty for empty list', () => {
        expect(getComboTitles([])).toBe('');
    });
});
