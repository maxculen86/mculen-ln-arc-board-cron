import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../../../../components/features/private-global/body/image/foodit';

jest.mock('@ln/foodit-ui-image', () => ({
    Image: ({
        className,
        src,
        alt,
        fetchPriority,
        loading,
        sources,
        ...props
    }) => (
        <img
            className={className}
            src={src}
            alt={alt}
            data-fetch-priority={fetchPriority}
            data-loading={loading}
            data-sources={JSON.stringify(sources)}
            {...props}
        />
    )
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/epigraph/foodit',
    () => {
        return function EpigraphComponent({ credits, caption }) {
            return (
                <div data-testid="epigraph">
                    <span data-testid="credits">{credits}</span>
                    <span data-testid="caption">{caption}</span>
                </div>
            );
        };
    }
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/mediaHelper',
    () => ({
        __esModule: true,
        getImagesToLoadWithPicture: jest.fn(() => ['source1', 'source2']),
        getShortestImage: jest.fn(() => ({ resizedUrl: 'shortest-url.jpg' }))
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/utils/notaFooditHelper',
    () => ({
        __esModule: true,
        getFooditAuthor: jest.fn(() => 'Test Author')
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/utils/getImageAltText',
    () => ({
        __esModule: true,
        default: jest.fn(() => 'Generated alt text')
    })
);

jest.mock(
    '../../../../../../components/features/private-global/body/image/helpers',
    () => {
        const helperActual = jest.requireActual(
            '../../../../../../components/features/private-global/body/image/helpers'
        );
        return {
            __esModule: true,
            ...helperActual,
            headerLevels: [1, 2, 3, 4, 5, 6],
            normalize: jest.fn(text =>
                typeof text === 'string'
                    ? text
                          .normalize('NFD')
                          .replace(/[\u0300-\u036f]/g, '')
                          .toLowerCase()
                    : ''
            ),
            PREPARATION_KEYWORDS: ['preparación', 'preparacion'],
            TIPS_KEYWORDS: ['tips', 'curiosidades'],
            processHeaderElement: helperActual.processHeaderElement
        };
    }
);

const mediaHelper = require('../../../../../../components/private/LN/common/utils/mediaHelper');
const notaFooditHelper = require('../../../../../../components/features/foodit-global/common/utils/notaFooditHelper');
const getImageAltText = require('../../../../../../components/features/foodit-global/common/utils/getImageAltText');
const helpers = require('../../../../../../components/features/private-global/body/image/helpers');

const mockData = {
    _id: 'img1',
    caption: 'Test caption',
    resized_urls: [
        { url: 'url1-small.jpg', width: 300 },
        { url: 'url2-large.jpg', width: 800 }
    ],
    url: 'test-image.jpg',
    additional_properties: { author: 'Test Author' }
};

const mockContentElements = [
    {
        _id: 'header1',
        type: 'header',
        content: 'Introduction',
        level: 2
    },
    {
        _id: 'text1',
        type: 'text',
        content: 'Some intro text'
    },
    {
        _id: 'header2',
        type: 'header',
        content: 'Preparación',
        level: 2
    },
    {
        _id: 'text2',
        type: 'text',
        content: 'Preparation steps'
    },
    {
        _id: 'img1',
        type: 'image'
    },
    {
        _id: 'header3',
        type: 'header',
        content: 'Tips',
        level: 2
    }
];

describe('BodyComponents - Foodit - Image', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mediaHelper.getImagesToLoadWithPicture.mockReturnValue([
            'source1',
            'source2'
        ]);
        mediaHelper.getShortestImage.mockReturnValue({
            resizedUrl: 'shortest-url.jpg'
        });
        notaFooditHelper.getFooditAuthor.mockReturnValue('Test Author');
        getImageAltText.default.mockReturnValue('Generated alt text');
        helpers.normalize.mockImplementation(text =>
            typeof text === 'string'
                ? text
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .toLowerCase()
                : ''
        );
    });

    describe('Basic rendering', () => {
        it('renders the image with correct src and alt', () => {
            render(<Image data={mockData} contentElements={[]} />);
            const imageElement = screen.getByRole('img');
            expect(imageElement).toHaveAttribute('src', 'shortest-url.jpg');
            expect(imageElement).toHaveAttribute('alt', 'Generated alt text');
        });

        it('renders the epigraph component with caption and credits', () => {
            render(<Image data={mockData} contentElements={[]} />);
            expect(screen.getByTestId('epigraph')).toBeInTheDocument();
            expect(screen.getByTestId('caption')).toHaveTextContent(
                'Test caption'
            );
            expect(screen.getByTestId('credits')).toHaveTextContent(
                'Test Author'
            );
        });

        it('sets correct image attributes', () => {
            render(<Image data={mockData} contentElements={[]} />);
            const imageElement = screen.getByRole('img');
            expect(imageElement).toHaveAttribute('data-fetch-priority', 'low');
            expect(imageElement).toHaveAttribute('data-loading', 'lazy');
        });
    });

    describe('Image configuration based on content context', () => {
        it('applies default configuration when not in preparation section', () => {
            render(<Image data={mockData} contentElements={[]} />);
            const imageElement = screen.getByRole('img');
            expect(imageElement).toHaveClass(
                'w-100',
                'ratio-3-2',
                'content-image'
            );

            const figure = imageElement.closest('figure');
            expect(figure).toHaveAttribute('data-image-section', 'contenido');
        });

        it('applies preparation configuration when image belongs to preparation section', () => {
            render(
                <Image data={mockData} contentElements={mockContentElements} />
            );
            const imageElement = screen.getByRole('img');
            expect(imageElement).toHaveClass(
                'preparation-image',
                'w-100',
                'max-w-260_md',
                'max-w-286_lg'
            );

            const figure = imageElement.closest('figure');
            expect(figure).toHaveAttribute('data-image-section', 'preparacion');
        });

        it('does not apply preparation config when image is outside preparation section', () => {
            const elementsWithImageOutsidePrep = [
                ...mockContentElements.slice(0, 2), // Header + text before prep
                {
                    _id: 'img1',
                    type: 'image'
                },
                ...mockContentElements.slice(2) // Prep section after image
            ];

            render(
                <Image
                    data={mockData}
                    contentElements={elementsWithImageOutsidePrep}
                />
            );
            const imageElement = screen.getByRole('img');
            expect(imageElement).toHaveClass(
                'w-100',
                'ratio-3-2',
                'content-image'
            );
            expect(imageElement).not.toHaveClass('preparation-image');
            expect(imageElement).not.toHaveClass('w-364_md');
        });
    });

    describe('Preparation section detection', () => {
        it('detects preparation section with string keyword', () => {
            const elementsWithPreparation = [
                {
                    type: 'header',
                    content: 'Preparación del plato',
                    level: 2
                },
                {
                    type: 'image',
                    _id: 'img1'
                }
            ];

            render(
                <Image
                    data={mockData}
                    contentElements={elementsWithPreparation}
                />
            );
            const figure = screen.getByRole('img').closest('figure');
            expect(figure).toHaveAttribute('data-image-section', 'preparacion');
            expect(screen.getByRole('img')).toHaveClass(
                'preparation-image',
                'w-100',
                'max-w-260_md',
                'max-w-286_lg'
            );
        });

        it('does not detect preparation section with "Para la" header alone', () => {
            const elementsWithPrepRegex = [
                {
                    type: 'header',
                    content: 'Para la cocción',
                    level: 2
                },
                {
                    type: 'image',
                    _id: 'img1'
                }
            ];

            render(
                <Image
                    data={mockData}
                    contentElements={elementsWithPrepRegex}
                />
            );
            const figure = screen.getByRole('img').closest('figure');
            expect(figure).toHaveAttribute('data-image-section', 'contenido');
            expect(screen.getByRole('img')).toHaveClass(
                'w-100',
                'ratio-3-2',
                'content-image'
            );
        });

        it('maintains preparation section when "Para la" appears as sub-header', () => {
            const elementsWithSubHeaders = [
                {
                    type: 'header',
                    content: 'Preparación',
                    level: 2
                },
                {
                    type: 'header',
                    content: 'Para la masa',
                    level: 4
                },
                {
                    type: 'text',
                    content: 'Mix ingredients'
                },
                {
                    type: 'header',
                    content: 'Para el relleno',
                    level: 4
                },
                {
                    type: 'image',
                    _id: 'img1'
                }
            ];

            render(
                <Image
                    data={mockData}
                    contentElements={elementsWithSubHeaders}
                />
            );
            const figure = screen.getByRole('img').closest('figure');
            expect(figure).toHaveAttribute('data-image-section', 'preparacion');
            expect(screen.getByRole('img')).toHaveClass(
                'preparation-image',
                'w-100',
                'max-w-260_md',
                'max-w-286_lg'
            );
        });

        it('exits preparation section when encountering tips header', () => {
            const elementsWithTipsAfterPrep = [
                {
                    type: 'header',
                    content: 'Preparación',
                    level: 2
                },
                {
                    type: 'header',
                    content: 'Curiosidades importantes',
                    level: 3
                },
                {
                    type: 'image',
                    _id: 'img1'
                }
            ];

            render(
                <Image
                    data={mockData}
                    contentElements={elementsWithTipsAfterPrep}
                />
            );
            const figure = screen.getByRole('img').closest('figure');
            expect(figure).toHaveAttribute('data-image-section', 'contenido');
            expect(screen.getByRole('img')).toHaveClass(
                'w-100',
                'ratio-3-2',
                'content-image'
            );
        });

        it('exits preparation section when encountering header of same or higher level', () => {
            const elementsWithHigherLevelHeader = [
                {
                    type: 'header',
                    content: 'Preparación',
                    level: 3
                },
                {
                    type: 'header',
                    content: 'Next Section',
                    level: 2
                },
                {
                    type: 'image',
                    _id: 'img1'
                }
            ];

            render(
                <Image
                    data={mockData}
                    contentElements={elementsWithHigherLevelHeader}
                />
            );
            const figure = screen.getByRole('img').closest('figure');
            expect(figure).toHaveAttribute('data-image-section', 'contenido');
            expect(screen.getByRole('img')).toHaveClass(
                'w-100',
                'ratio-3-2',
                'content-image'
            );
        });

        it('handles multiple preparation sections correctly', () => {
            const elementsWithMultiplePrep = [
                {
                    type: 'header',
                    content: 'Preparación inicial',
                    level: 1
                },
                {
                    type: 'image',
                    _id: 'img1'
                },
                {
                    type: 'header',
                    content: 'Ingredientes',
                    level: 1
                },
                {
                    type: 'image',
                    _id: 'img2'
                },
                {
                    type: 'header',
                    content: 'Preparación final',
                    level: 1
                },
                {
                    type: 'image',
                    _id: 'img3'
                }
            ];

            render(
                <Image
                    data={{ ...mockData, _id: 'img1' }}
                    contentElements={elementsWithMultiplePrep}
                />
            );
            const figure = screen.getByRole('img').closest('figure');
            expect(figure).toHaveAttribute('data-image-section', 'preparacion');
        });
        it('does NOT render epigraph when image IS in preparation section', () => {
            render(
                <Image data={mockData} contentElements={mockContentElements} />
            );
            expect(screen.queryByTestId('epigraph')).not.toBeInTheDocument();
        });
    });
});
