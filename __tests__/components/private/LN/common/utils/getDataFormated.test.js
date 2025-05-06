import {
    getCustParamsEncoded,
    getCategories,
    getAuthors,
    getAuthorsFromContentElements,
    getTags,
    decorator
} from '../../../../../../components/private/LN/common/utils/getDataFormated';

describe('componentes - private - LN - common - utils', () => {
    it('should return a string with encoded data when all parameters are provided', () => {
        const tags = [{ text: 'tag1' }, { text: 'tag2' }];
        const sections = [{ name: 'section1' }, { name: 'section2' }];
        const authors = [{ name: 'Author 1' }, { name: 'Author 2' }];
        const id = '12345';
        const contentElements = [];

        const result = getCustParamsEncoded(
            tags,
            sections,
            contentElements,
            id,
            authors
        );

        expect(result).toBe(
            'te_tag1%2Cte_tag2%2Cca_section1%2Cca_section2%2Cau_author_1%2Cau_author_2%2C12345'
        );
    });

    it('should return a string with the given prefix and string, with lowercase letters and diacritics removed and special characters replaced by the given string', () => {
        const result = decorator('prefix_', /\W/g, '_', 'Test String');
        expect(result).toBe('prefix_test_string');
    });

    it('should return a comma-separated string of authors from content elements', () => {
        const contentElements = [
            {
                additional_properties: { nodeType: 'firma' },
                content: 'Author 1'
            },
            {
                additional_properties: { nodeType: 'firma' },
                content: 'Author 2'
            }
        ];
        const expected = 'au_author_1,au_author_2';

        const result = getAuthorsFromContentElements(contentElements);

        expect(result).toBe(expected);
    });

    it('should return an empty string for empty content elements', () => {
        const contentElements = [];
        const expected = '';

        const result = getAuthorsFromContentElements(contentElements);

        expect(result).toBe(expected);
    });

    it('should return an empty string if content elements do not have "firma" nodeType', () => {
        const contentElements = [
            {
                additional_properties: { nodeType: 'article' },
                content: 'Author 1'
            },
            {
                additional_properties: { nodeType: 'article' },
                content: 'Author 2'
            }
        ];
        const expected = '';

        const result = getAuthorsFromContentElements(contentElements);

        expect(result).toBe(expected);
    });

    it('should return a comma-separated string of authors', () => {
        const authors = [{ name: 'Author 1' }, { name: 'Author 2' }];
        const expected = 'au_author_1,au_author_2';

        const result = getAuthors(authors);

        expect(result).toBe(expected);
    });

    it('should return an empty string for empty authors', () => {
        const authors = [];
        const expected = '';

        const result = getAuthors(authors);

        expect(result).toBe(expected);
    });

    it('should return a comma-separated string of tags', () => {
        const tags = [{ text: 'Tag 1' }, { text: 'Tag 2' }];
        const expected = 'te_tag_1,te_tag_2';

        const result = getTags(tags);

        expect(result).toBe(expected);
    });

    it('should return an empty string for empty tags', () => {
        const tags = [];
        const expected = '';

        const result = getTags(tags);

        expect(result).toBe(expected);
    });

    it('should return a comma-separated string of categories', () => {
        const sections = [{ name: 'Category 1' }, { name: 'Category 2' }];
        const expected = 'ca_category_1,ca_category_2';

        const result = getCategories(sections);

        expect(result).toBe(expected);
    });

    it('should return an empty string for empty sections', () => {
        const sections = [];
        const expected = '';

        const result = getCategories(sections);

        expect(result).toBe(expected);
    });
});
