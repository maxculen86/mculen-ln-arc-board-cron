jest.mock('../../../../../properties/sites/la-nacion-ar', () => ({
    default: {
        layoutsName: {
            Cards: 'MockCardsLayout'
        }
    }
}));

jest.mock(
    '../../../../../components/private/common/utils/getBajadaOrFirstTextParagraph'
);

jest.mock(
    '../../../../../components/private/common/utils/sectionUtils',
    () => ({
        getSectionLogo: jest.fn(() => ({ logoName: 'MockLogo' }))
    })
);

import { getSectionLogo } from '../../../../../components/private/common/utils/sectionUtils';
import {
    getNotaCardsAperturaData,
    resolveDualTitles
} from 'layouts/LN-Nota-Cards/_helpers/notaCardsHelper';
import getBajadaOrFirstTextParagraph from '../../../../../components/private/common/utils/getBajadaOrFirstTextParagraph';

describe('notaCardsHelper - getNotaCardsAperturaData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getBajadaOrFirstTextParagraph.mockReturnValue('');
    });

    it('extracts all data fields correctly from globalContent', () => {
        const globalContent = {
            headlines: { basic: 'Test Title' },
            subheadlines: { basic: 'Test Subtitle' },
            description: { basic: 'Test Description' },
            content_restrictions: { content_code: 'abierta' },
            credits: { by: [{ name: 'Author 1' }, { name: 'Author 2' }] },
            first_publish_date: '2023-01-01T10:00:00Z',
            label: { text: 'Test Label' },
            taxonomy: { sections: [{ name: 'Economía' }] },
            distributor: { name: 'LA NACION' }
        };

        const result = getNotaCardsAperturaData(globalContent);

        expect(result.dataMeta.publishDate).toBe('2023-01-01T10:00:00Z');
        expect(result.dataMeta.authors).toHaveLength(2);

        expect(result.dataContent.isSubscriber).toBe(false);
        expect(result.dataContent.title).toBe('Test Title');
        expect(result.dataContent.subtitle).toBe('Test Subtitle');
        expect(result.dataContent.description).toBe('Test Description');
        expect(result.dataContent.label.text).toBe('Test Label');
        expect(result.dataContent.logoData).toEqual({ logoName: 'MockLogo' });
        expect(getSectionLogo).toHaveBeenCalled();
    });

    it('detects subscriber content correctly when content_code is cerrada', () => {
        const globalContent = {
            headlines: { basic: 'Premium Content' },
            subheadlines: { basic: 'Premium Subtitle' },
            content_restrictions: { content_code: 'cerrada' }
        };

        const result = getNotaCardsAperturaData(globalContent);

        expect(result.dataContent.isSubscriber).toBe(true);
        expect(result.dataContent.title).toBe('Premium Content');
        expect(result.dataContent.subtitle).toBe('Premium Subtitle');
    });

    it('falls back to first paragraph when description is empty', () => {
        getBajadaOrFirstTextParagraph.mockReturnValue(
            'Primer párrafo de la nota'
        );

        const globalContent = {
            headlines: { basic: 'Fallback Title' },
            subheadlines: { basic: 'Fallback Bajada' },
            description: { basic: '' },
            content_elements: [
                { type: 'text', content: 'Primer párrafo de la nota' }
            ]
        };

        const result = getNotaCardsAperturaData(globalContent);

        expect(result.dataContent.description).toBe(
            'Primer párrafo de la nota'
        );
        expect(getBajadaOrFirstTextParagraph).toHaveBeenCalledWith(
            {
                ...globalContent,
                subheadlines: {
                    basic: ''
                }
            },
            { truncateResult: false }
        );
    });

    it('handles missing content_restrictions gracefully', () => {
        const globalContent = {
            headlines: { basic: 'Regular Content' },
            subheadlines: { basic: 'Regular Subtitle' }
        };

        const result = getNotaCardsAperturaData(globalContent);

        expect(result.dataContent.isSubscriber).toBe(false);
        expect(result.dataContent.title).toBe('Regular Content');
        expect(result.dataContent.subtitle).toBe('Regular Subtitle');
    });

    it('handles empty globalContent gracefully', () => {
        const result = getNotaCardsAperturaData({});

        expect(result.dataMeta.publishDate).toBeUndefined();
        expect(result.dataMeta.authors).toEqual([]);

        expect(result.dataContent.isSubscriber).toBe(false);
        expect(result.dataContent.title).toBe('');
        expect(result.dataContent.subtitle).toBe('');
        expect(result.dataContent.description).toBe('');
        expect(result.dataContent.label).toBeUndefined();
        expect(result.dataContent.logoData).toEqual({ logoName: 'MockLogo' });
    });

    it('handles undefined globalContent gracefully', () => {
        const result = getNotaCardsAperturaData();

        expect(result.dataContent.isSubscriber).toBe(false);
        expect(result.dataContent.title).toBe('');
        expect(result.dataContent.subtitle).toBe('');
        expect(result.dataContent.description).toBe('');
    });

    it('follows existing nota cards pattern with structured data', () => {
        const globalContent = {
            headlines: { basic: 'Test' },
            content_restrictions: { content_code: 'cerrada' }
        };

        const result = getNotaCardsAperturaData(globalContent);

        expect(result).toHaveProperty('dataMeta');
        expect(result).toHaveProperty('dataContent');
        expect(typeof result.dataMeta).toBe('object');
        expect(typeof result.dataContent).toBe('object');

        expect(result.dataContent).toHaveProperty('isSubscriber');
    });

    it('preserves backward compatibility with existing fields', () => {
        const globalContent = {
            headlines: { basic: 'Title' },
            subheadlines: { basic: 'Subtitle' },
            description: { basic: 'Description' },
            credits: { by: [{ name: 'Author' }] },
            first_publish_date: '2023-01-01',
            label: { text: 'Label' }
        };

        const result = getNotaCardsAperturaData(globalContent);

        expect(result.dataMeta).toHaveProperty('publishDate');
        expect(result.dataMeta).toHaveProperty('authors');
        expect(result.dataContent).toHaveProperty('title');
        expect(result.dataContent).toHaveProperty('subtitle');
        expect(result.dataContent).toHaveProperty('description');
        expect(result.dataContent).toHaveProperty('label');
        expect(result.dataContent).toHaveProperty('isSubscriber');
    });

    it('handles dual titles correctly when both work title and native title are provided', () => {
        const globalContent = {
            headlines: { basic: 'Título de trabajo', native: 'Título Nativo' },
            subheadlines: { basic: 'Test Subtitle' },
            description: { basic: 'Test Description' }
        };

        const result = getNotaCardsAperturaData(globalContent);

        expect(result.dataContent.title).toBe('Título Nativo');
        expect(result.dataContent.secondaryTitle).toBe('Título de trabajo');
    });

    it('uses work title as primary when no native title is provided', () => {
        const globalContent = {
            headlines: { basic: 'Título de trabajo' },
            subheadlines: { basic: 'Test Subtitle' },
            description: { basic: 'Test Description' }
        };

        const result = getNotaCardsAperturaData(globalContent);

        expect(result.dataContent.title).toBe('Título de trabajo');
        expect(result.dataContent.secondaryTitle).toBe(null);
    });
});

describe('notaCardsHelper - resolveDualTitles', () => {
    it('returns only primary title when no native title is provided', () => {
        const result = resolveDualTitles('Título de trabajo', '');

        expect(result.primaryTitle).toBe('Título de trabajo');
        expect(result.secondaryTitle).toBe(null);
    });

    it('returns native title as primary and work title as secondary when both are provided', () => {
        const result = resolveDualTitles('Título de trabajo', 'Título Nativo');

        expect(result.primaryTitle).toBe('Título Nativo');
        expect(result.secondaryTitle).toBe('Título de trabajo');
    });

    it('returns native title as primary and no secondary when only native title is provided', () => {
        const result = resolveDualTitles('', 'Título Nativo');

        expect(result.primaryTitle).toBe('Título Nativo');
        expect(result.secondaryTitle).toBe(null);
    });

    it('handles empty strings and whitespace correctly', () => {
        const result = resolveDualTitles('  ', '   Título Nativo   ');

        expect(result.primaryTitle).toBe('Título Nativo');
        expect(result.secondaryTitle).toBe(null);
    });

    it('returns empty primary and null secondary when both titles are empty', () => {
        const result = resolveDualTitles('', '');

        expect(result.primaryTitle).toBe('');
        expect(result.secondaryTitle).toBe(null);
    });
});
