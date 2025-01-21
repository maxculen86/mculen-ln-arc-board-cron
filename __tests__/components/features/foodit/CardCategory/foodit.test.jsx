import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CardCategory from '../../../../../components/features/foodit/CardCategory/foodit';
import { useContent } from 'fusion:content';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('fusion:consumer', () => Component => Component);

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('Components - features - foodit - CardCategory', () => {
    const fooditCategoryImageSource = {
        promo_items: {
            basic: {
                resized_urls: [
                    {
                        option: {
                            height: 174,
                            width: 116
                        },
                        resizedUrl:
                            'https://sandbox-resizer.glanacion.com/resizer/v2/E74GZJYWCBEBRBQY4JKVS2UYZA.jpg?auth=c9fd48c08e2932ae4055beea8a378eb28a7555181528b1a5479d4ca745fab031&width=174&height=116&quality=70&smart=true'
                    }
                ]
            }
        }
    };
    it('renders correctly with valid props', () => {
        useContent.mockReturnValue(fooditCategoryImageSource);
        const props = {
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

    it('should call addEventToDataLayerV2 with correct parameters when clicked', () => {
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
        fireEvent.click(categoryElement);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'navbar',
            button: 'Test Title',
            label: '1'
        });
    });

    it('should render the Category component with correct props', () => {
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
});
