import getHtmlLang from '../../../../../../components/private/LN/common/utils/getHtmlLang';

describe('Component - private - LN - common - utils - getHtmlLang', () => {
    test('should return "en" for a note whose primary section is /usa', () => {
        const globalContent = {
            taxonomy: {
                primary_section: {
                    _id: '/usa'
                }
            }
        };

        expect(getHtmlLang({ globalContent })).toBe('en');
    });

    test('should return "en" for a note whose primary section is a subsection of /usa', () => {
        const globalContent = {
            taxonomy: {
                primary_section: {
                    _id: '/usa/politica'
                }
            }
        };

        expect(getHtmlLang({ globalContent })).toBe('en');
    });

    test('should return "en" for the /usa section page itself', () => {
        const globalContent = {
            _id: '/usa'
        };

        expect(getHtmlLang({ globalContent })).toBe('en');
    });

    test('should return "es" for a note in another section', () => {
        const globalContent = {
            taxonomy: {
                primary_section: {
                    _id: '/politica'
                }
            }
        };

        expect(getHtmlLang({ globalContent })).toBe('es');
    });

    test('should return "es" for another section page', () => {
        const globalContent = {
            _id: '/politica'
        };

        expect(getHtmlLang({ globalContent })).toBe('es');
    });

    test('should return "es" when globalContent has no section info', () => {
        expect(getHtmlLang({ globalContent: {} })).toBe('es');
    });

    test('should return "es" when called without arguments', () => {
        expect(getHtmlLang()).toBe('es');
    });
});
