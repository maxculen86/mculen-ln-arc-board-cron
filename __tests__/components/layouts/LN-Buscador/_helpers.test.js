import {
    getQueryForFilters,
    transformPubDateLabel,
    transformListGroups,
    checkStateCheckbox,
    parseInitialFiltersFromUrl,
    buildFilterUrlParams
} from '../../../../components/layouts/LN-Buscador/_helpers';

jest.mock('fusion:environment', () => ({}));
jest.mock('fusion:context', () => ({}));

describe('getQueryForFilters', () => {
    it('returns empty string when no filters provided', () => {
        expect(getQueryForFilters()).toBe('');
    });

    it('returns empty string for empty filters object', () => {
        expect(getQueryForFilters({})).toBe('');
    });

    it('builds query string for single filter with single value', () => {
        const result = getQueryForFilters({ section: ['deportes'] });
        expect(result).toBe('&facetedkey=section&facetedvalue=[deportes]');
    });

    it('builds query string for single filter with multiple values', () => {
        const result = getQueryForFilters({
            section: ['deportes', 'politica']
        });
        expect(result).toBe(
            '&facetedkey=section&facetedvalue=[deportes]^[politica]'
        );
    });

    it('builds query string for multiple filter groups', () => {
        const result = getQueryForFilters({
            section: ['deportes'],
            creator: ['john']
        });
        expect(result).toContain('&facetedkey=');
        expect(result).toContain('section');
        expect(result).toContain('creator');
        expect(result).toContain('[deportes]');
        expect(result).toContain('[john]');
    });

    it('separates multiple groups with pipe character', () => {
        const result = getQueryForFilters({
            section: ['deportes'],
            creator: ['john']
        });
        // facetedkey should have pipe between groups
        expect(result).toContain('section|creator');
    });
});

describe('transformPubDateLabel', () => {
    it('returns "Últimas 24 horas" for key 24', () => {
        expect(transformPubDateLabel(24)).toBe('Últimas 24 horas');
    });

    it('returns "Última semana" for key 168', () => {
        expect(transformPubDateLabel(168)).toBe('Última semana');
    });

    it('returns "Último mes" for key 720', () => {
        expect(transformPubDateLabel(720)).toBe('Último mes');
    });

    it('returns "Último año" for key 8760', () => {
        expect(transformPubDateLabel(8760)).toBe('Último año');
    });

    it('returns the key itself for unknown keys', () => {
        expect(transformPubDateLabel(999)).toBe(999);
    });

    it('returns the key itself for string keys not in the map', () => {
        expect(transformPubDateLabel('custom')).toBe('custom');
    });
});

describe('transformListGroups', () => {
    it('returns empty array for null/undefined input', () => {
        expect(transformListGroups(null)).toEqual([]);
        expect(transformListGroups(undefined)).toEqual([]);
    });

    it('returns empty array when all groups are empty', () => {
        expect(
            transformListGroups({ pubDate: [], section: [], creator: [] })
        ).toEqual([]);
    });

    it('maps pubDate group with correct name and transforms labels', () => {
        const input = {
            pubDate: [{ key: 24, count: 10 }]
        };
        const result = transformListGroups(input);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('FECHA');
        expect(result[0].group).toBe('pubDate');
        expect(result[0].childrens[0].label).toBe('Últimas 24 horas');
        expect(result[0].childrens[0].checked).toBe(false);
    });

    it('maps section group with correct name and uses key as label', () => {
        const input = {
            section: [{ key: 'deportes', count: 5 }]
        };
        const result = transformListGroups(input);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('SECCIONES');
        expect(result[0].group).toBe('section');
        expect(result[0].childrens[0].label).toBe('deportes');
    });

    it('maps creator group with correct name', () => {
        const input = {
            creator: [{ key: 'Jane Doe', count: 3 }]
        };
        const result = transformListGroups(input);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('AUTOR');
        expect(result[0].group).toBe('creator');
        expect(result[0].childrens[0].label).toBe('Jane Doe');
    });

    it('initializes all childrens with checked: false', () => {
        const input = {
            section: [
                { key: 'deportes', count: 5 },
                { key: 'politica', count: 2 }
            ]
        };
        const result = transformListGroups(input);
        result[0].childrens.forEach(child => {
            expect(child.checked).toBe(false);
        });
    });

    it('includes all populated groups', () => {
        const input = {
            pubDate: [{ key: 24 }],
            section: [{ key: 'tech' }],
            creator: [{ key: 'Author' }]
        };
        const result = transformListGroups(input);
        expect(result).toHaveLength(3);
    });

    it('ignores groups not recognized (extra keys)', () => {
        // Only pubDate, section, creator are recognized
        const input = {
            pubDate: [{ key: 24 }],
            unknown: [{ key: 'foo' }]
        };
        const result = transformListGroups(input);
        expect(result).toHaveLength(1);
        expect(result[0].group).toBe('pubDate');
    });
});

describe('parseInitialFiltersFromUrl', () => {
    it('returns empty object when no params provided', () => {
        expect(parseInitialFiltersFromUrl()).toEqual({});
    });

    it('returns empty object when fkey is empty', () => {
        expect(parseInitialFiltersFromUrl('', 'avisos')).toEqual({});
    });

    it('returns empty object when fval is empty', () => {
        expect(parseInitialFiltersFromUrl('section', '')).toEqual({});
    });

    it('parses single key-value pair', () => {
        expect(parseInitialFiltersFromUrl('section', 'avisos')).toEqual({
            section: ['avisos']
        });
    });

    it('parses multiple key-value pairs separated by pipe', () => {
        expect(
            parseInitialFiltersFromUrl('section|pubdate', 'avisos|48')
        ).toEqual({
            section: ['avisos'],
            pubdate: ['48']
        });
    });

    it('parses multiple values within a group separated by caret', () => {
        expect(
            parseInitialFiltersFromUrl('section', 'deportes^politica')
        ).toEqual({
            section: ['deportes', 'politica']
        });
    });

    it('ignores key positions where fval has no corresponding value', () => {
        const result = parseInitialFiltersFromUrl('section|creator', 'avisos');
        expect(result.section).toEqual(['avisos']);
        expect(result.creator).toBeUndefined();
    });
});

describe('buildFilterUrlParams', () => {
    it('returns null fkey and fval for empty filters', () => {
        expect(buildFilterUrlParams({})).toEqual({ fkey: null, fval: null });
    });

    it('returns null fkey and fval when called with no args', () => {
        expect(buildFilterUrlParams()).toEqual({ fkey: null, fval: null });
    });

    it('builds single group', () => {
        expect(buildFilterUrlParams({ section: ['avisos'] })).toEqual({
            fkey: 'section',
            fval: 'avisos'
        });
    });

    it('builds multiple groups separated by pipe', () => {
        expect(
            buildFilterUrlParams({ section: ['avisos'], pubdate: ['48'] })
        ).toEqual({ fkey: 'section|pubdate', fval: 'avisos|48' });
    });

    it('joins multiple values within a group with caret', () => {
        expect(
            buildFilterUrlParams({ section: ['deportes', 'politica'] })
        ).toEqual({ fkey: 'section', fval: 'deportes^politica' });
    });

    it('round-trips correctly with parseInitialFiltersFromUrl', () => {
        const filters = { section: ['avisos'], pubdate: ['48'] };
        const { fkey, fval } = buildFilterUrlParams(filters);
        expect(parseInitialFiltersFromUrl(fkey, fval)).toEqual(filters);
    });

    it('round-trips with multiple values per group', () => {
        const filters = {
            section: ['deportes', 'politica'],
            creator: ['john']
        };
        const { fkey, fval } = buildFilterUrlParams(filters);
        expect(parseInitialFiltersFromUrl(fkey, fval)).toEqual(filters);
    });
});

describe('checkStateCheckbox', () => {
    const baseCheckboxes = [
        { key: '24', label: 'Últimas 24 horas' },
        { key: '168', label: 'Última semana' }
    ];

    it('marks checkbox as checked when key is in filters group', () => {
        const result = checkStateCheckbox({
            checkboxes: baseCheckboxes,
            group: 'pubDate',
            filters: { pubDate: ['24'] }
        });
        expect(result[0].checked).toBe(true);
        expect(result[1].checked).toBe(false);
    });

    it('marks all checkboxes as unchecked when group is not in filters', () => {
        const result = checkStateCheckbox({
            checkboxes: baseCheckboxes,
            group: 'pubDate',
            filters: {}
        });
        result.forEach(cb => expect(cb.checked).toBe(false));
    });

    it('marks all checkboxes as unchecked when filters is empty object', () => {
        const result = checkStateCheckbox({
            checkboxes: baseCheckboxes,
            group: 'pubDate',
            filters: {}
        });
        result.forEach(cb => expect(cb.checked).toBe(false));
    });

    it('uses default empty array for checkboxes when not provided', () => {
        const result = checkStateCheckbox({ group: 'pubDate', filters: {} });
        expect(result).toEqual([]);
    });

    it('preserves original checkbox properties', () => {
        const result = checkStateCheckbox({
            checkboxes: [{ key: '24', label: 'test', extra: 'data' }],
            group: 'pubDate',
            filters: { pubDate: ['24'] }
        });
        expect(result[0].label).toBe('test');
        expect(result[0].extra).toBe('data');
        expect(result[0].checked).toBe(true);
    });
});
