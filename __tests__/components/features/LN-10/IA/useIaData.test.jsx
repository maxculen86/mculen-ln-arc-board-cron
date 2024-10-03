import arrayData from '../../../../../__mocks__/data/glossary/arrayWords.json';
import useIaData from '../../../../../components/features/LN-10/IA/hooks/useIaData';

jest.mock('../../../../../components/private/common/hooks/useTermica');

jest.mock(
    '../../../../../components/features/LN-10/IA/hooks/useIaData',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

describe('useIaData', () => {
    const mockGlobalContent = {
        promo_items: {
            summary: {
                embed: {
                    config: {
                        arrayBullets: ['This', 'array', 'bullets', 'here']
                    }
                }
            },
            glossary: {
                embed: {
                    config: {
                        arrayData: arrayData
                    }
                }
            }
        }
    };

    const mockIaData = (
        shouldShowSummary = true,
        shouldShowGlossary = true
    ) => {
        const iaData = [];

        if (shouldShowSummary) {
            iaData.push({
                id: 'summary',
                title: 'Resumen de lectura',
                callback: jest.fn(),
                data: mockGlobalContent.promo_items.summary.embed.config
                    .arrayBullets
            });
        }

        if (shouldShowGlossary) {
            iaData.push({
                id: 'glossary',
                title: 'Glosario',
                callback: jest.fn(),
                data: mockGlobalContent.promo_items.glossary.embed.config
                    .arrayData
            });
        }

        return {
            iaData,
            shouldShowSummary,
            shouldShowGlossary
        };
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return summary and glossary when both features are enabled', () => {
        useIaData.mockImplementation(() => mockIaData(true, true));

        const result = useIaData(mockGlobalContent, true, true);

        expect(result.iaData).toEqual([
            {
                id: 'summary',
                title: 'Resumen de lectura',
                callback: expect.any(Function),
                data: mockGlobalContent.promo_items.summary.embed.config
                    .arrayBullets
            },
            {
                id: 'glossary',
                title: 'Glosario',
                callback: expect.any(Function),
                data: mockGlobalContent.promo_items.glossary.embed.config
                    .arrayData
            }
        ]);
        expect(result.shouldShowSummary).toBe(true);
        expect(result.shouldShowGlossary).toBe(true);
    });

    it('should not return glossary when shouldShowGlossary is false', () => {
        useIaData.mockImplementation(() => mockIaData(true, false));

        const result = useIaData(mockGlobalContent, true, false);

        expect(result.iaData).toEqual([
            {
                id: 'summary',
                title: 'Resumen de lectura',
                callback: expect.any(Function),
                data: mockGlobalContent.promo_items.summary.embed.config
                    .arrayBullets
            }
        ]);
        expect(result.shouldShowSummary).toBe(true);
        expect(result.shouldShowGlossary).toBe(false);
    });

    it('should not return summary when shouldShowSummary is false', () => {
        useIaData.mockImplementation(() => mockIaData(false, true));

        const result = useIaData(mockGlobalContent, false, true);
        expect(result.iaData).toEqual([
            {
                id: 'glossary',
                title: 'Glosario',
                callback: expect.any(Function),
                data: mockGlobalContent.promo_items.glossary.embed.config
                    .arrayData
            }
        ]);
        expect(result.shouldShowSummary).toBe(false);
        expect(result.shouldShowGlossary).toBe(true);
    });

    it('should return empty iaData when both are hidden', () => {
        useIaData.mockImplementation(() => mockIaData(false, false));

        const result = useIaData(mockGlobalContent, false, false);

        expect(result.iaData).toEqual([]);
        expect(result.shouldShowSummary).toBe(false);
        expect(result.shouldShowGlossary).toBe(false);
    });
});
