import React from 'react';
import { render, screen } from '@testing-library/react';
import CardCategory from '../../../../../components/features/foodit/CardCategory/foodit';
import { useContent } from 'fusion:content';
import * as helpers from '../../../../../components/features/foodit/CardCategory/_helper';

jest.mock('fusion:consumer', () => Component => Component);

jest.mock(
    '../../../../../components/features/foodit/CardCategory/_helper',
    () => ({
        ...jest.requireActual(
            '../../../../../components/features/foodit/CardCategory/_helper'
        ),
        registerCardIndex: jest.fn()
    })
);

describe('Components - features - foodit - CardCategory', () => {
    const fooditCategoryImageSource = {
        promo_items: {
            basic: {
                resized_urls: [
                    {
                        option: {
                            height: 150,
                            width: 150,
                            proportion: '1:1',
                            quality: 85
                        },
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/E74GZJYWCBEBRBQY4JKVS2UYZA.jpg?auth=c9fd48c08e2932ae4055beea8a378eb28a7555181528b1a5479d4ca745fab031&width=150&height=150&quality=85&smart=true'
                    }
                ]
            }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        helpers.registerCardIndex.mockReturnValue(0);
    });

    it('renders correctly with valid props', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);
        const props = {
            id: 'test-feature-id',
            isAdmin: false,
            customFields: {
                title: 'Titulo',
                image: 'E74GZJYWCBEBRBQY4JKVS2UYZA',
                url: '/recetas'
            }
        };

        render(<CardCategory {...props} />);

        expect(screen.getByText('Titulo')).toBeInTheDocument();
        expect(screen.getByAltText('Foto de Titulo')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/recetas');
        expect(helpers.registerCardIndex).toHaveBeenCalledWith(
            'test-feature-id'
        );
    });

    it('renders correctly with valid props - acu tema', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);
        const props = {
            isAdmin: false,
            id: 'ABC-000',
            customFields: {
                title: 'Titulo',
                image: 'E74GZJYWCBEBRBQY4JKVS2UYZA',
                url: '',
                query: 'carne'
            }
        };

        render(<CardCategory {...props} />);

        expect(screen.getByText('Titulo')).toBeInTheDocument();
        expect(screen.getByAltText('Foto de Titulo')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/tema/titulo-abc-000/?query=carne&title=Titulo'
        );
    });

    it('renders warnings correctly with invalid props when is Admin - no image found', () => {
        useContent.mockReturnValue({});
        const props = {
            id: 'test-id',
            isAdmin: true,
            customFields: {
                title: 'Titulo',
                image: 'E74GZJYWCBEBRBQY4JKVS2UYZA',
                url: '/recetas'
            }
        };

        render(<CardCategory {...props} />);
        expect(screen.getByText('No se encontro imagen')).toBeInTheDocument();
    });

    it('renders warnings correctly with invalid props when is Admin - no title', () => {
        const props = {
            id: 'test-id',
            isAdmin: true,
            customFields: {
                title: '',
                image: 'E74GZJYWCBEBRBQY4JKVS2UYZA',
                url: '/recetas'
            }
        };

        render(<CardCategory {...props} />);
        expect(screen.getByText('Se requiere un titulo')).toBeInTheDocument();
    });

    it('should render Category with correct data-label attribute', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);

        helpers.registerCardIndex.mockReturnValue(2);

        const props = {
            id: 'test-id',
            isAdmin: false,
            customFields: {
                title: 'Test Title',
                image: 'test-image-id',
                url: 'https://test-url.com',
                query: 'test-query',
                groups: [],
                itemGroups: []
            }
        };

        const { container } = render(<CardCategory {...props} />);

        const categoryElement = container.querySelector(
            '[data-interaction="dataLayerInteraction"]'
        );
        expect(categoryElement).toHaveAttribute('data-label', '3');
        expect(categoryElement).toHaveAttribute('data-button', 'Test Title');
        expect(categoryElement).toHaveAttribute('data-event', 'navbar');
    });

    it('should handle cardIndex 0 correctly (first card)', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);

        helpers.registerCardIndex.mockReturnValue(0);

        const props = {
            id: 'first-card',
            isAdmin: false,
            customFields: {
                title: 'First Card',
                image: 'test-image-id',
                url: '/test',
                query: '',
                groups: [],
                itemGroups: []
            }
        };

        const { container } = render(<CardCategory {...props} />);

        const categoryElement = container.querySelector(
            '[data-interaction="dataLayerInteraction"]'
        );
        expect(categoryElement).toHaveAttribute('data-label', '1');
    });

    it('should register unique featureId in registry', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);

        const featureId = 'unique-feature-id-123';
        const props = {
            id: featureId,
            isAdmin: false,
            customFields: {
                title: 'Test',
                image: 'test-image',
                url: '/test',
                query: '',
                groups: [],
                itemGroups: []
            }
        };

        render(<CardCategory {...props} />);

        expect(helpers.registerCardIndex).toHaveBeenCalledWith(featureId);
        expect(helpers.registerCardIndex).toHaveBeenCalledTimes(1);
    });

    it('should render multiple cards with sequential labels', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);

        helpers.registerCardIndex
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(1)
            .mockReturnValueOnce(2);

        const { container: container1 } = render(
            <CardCategory
                id="card-1"
                isAdmin={false}
                customFields={{
                    title: 'Card 1',
                    image: 'image-1',
                    url: '/card-1'
                }}
            />
        );

        const { container: container2 } = render(
            <CardCategory
                id="card-2"
                isAdmin={false}
                customFields={{
                    title: 'Card 2',
                    image: 'image-2',
                    url: '/card-2'
                }}
            />
        );

        const { container: container3 } = render(
            <CardCategory
                id="card-3"
                isAdmin={false}
                customFields={{
                    title: 'Card 3',
                    image: 'image-3',
                    url: '/card-3'
                }}
            />
        );

        const card1Element = container1.querySelector(
            '[data-interaction="dataLayerInteraction"]'
        );
        const card2Element = container2.querySelector(
            '[data-interaction="dataLayerInteraction"]'
        );
        const card3Element = container3.querySelector(
            '[data-interaction="dataLayerInteraction"]'
        );

        expect(card1Element).toHaveAttribute('data-label', '1');
        expect(card2Element).toHaveAttribute('data-label', '2');
        expect(card3Element).toHaveAttribute('data-label', '3');
    });

    it('should render the Category component with correct props', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);

        const props = {
            id: 'test-id',
            isAdmin: false,
            customFields: {
                title: 'Test Title',
                image: 'test-image-id',
                url: 'https://test-url.com',
                query: 'test-query',
                groups: [],
                itemGroups: []
            }
        };

        render(<CardCategory {...props} />);

        const categoryElement = screen.getByText('Test Title');
        expect(categoryElement).toBeInTheDocument();
        expect(categoryElement.closest('a')).toHaveAttribute(
            'href',
            'https://test-url.com'
        );
    });

    it('should handle empty imageUrl gracefully', () => {
        useContent.mockReturnValue({});

        const props = {
            id: 'test-id',
            isAdmin: false,
            customFields: {
                title: 'Test Title',
                image: '',
                url: 'https://test-url.com',
                query: 'test-query',
                groups: [],
                itemGroups: []
            }
        };

        const { container } = render(<CardCategory {...props} />);

        expect(screen.getByText('Test Title')).toBeInTheDocument();

        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('alt', 'Foto de Test Title');

        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            'https://test-url.com'
        );
    });

    it('should match snapshot with complete props', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);
        helpers.registerCardIndex.mockReturnValue(0);

        const props = {
            id: 'snapshot-test-id',
            isAdmin: false,
            customFields: {
                title: 'Snapshot Title',
                image: 'E74GZJYWCBEBRBQY4JKVS2UYZA',
                url: '/recetas',
                query: '',
                groups: [],
                itemGroups: []
            }
        };

        const { container } = render(<CardCategory {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
