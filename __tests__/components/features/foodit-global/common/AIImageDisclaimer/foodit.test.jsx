import React from 'react';
import { render, screen } from '@testing-library/react';
import { AIImageDisclaimer } from '../../../../../../components/features/foodit-global/common/AIImageDisclaimer/foodit';

jest.mock(
    '../../../../../../components/features/private-global/body/image/helpers',
    () => ({
        useLastPreparationImageId: jest.fn()
    })
);

const helpers = require('../../../../../../components/features/private-global/body/image/helpers');

const mockGlobalContent = {
    content_elements: [
        { type: 'header', content: 'Preparación', level: 2 },
        { type: 'image', _id: 'img1' }
    ],
    label: {
        leyenda_imagenes_ia: {
            text: 'Si'
        }
    }
};

describe('AIImageDisclaimer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders disclaimer when there are preparation images and field is "Si"', () => {
        helpers.useLastPreparationImageId.mockReturnValue('img1');

        render(<AIImageDisclaimer globalContent={mockGlobalContent} />);

        expect(
            screen.getByText(
                /Las imágenes utilizadas en la preparación de esta receta fueron generadas con IA/i
            )
        ).toBeInTheDocument();
    });

    it('does NOT render when field is "No"', () => {
        helpers.useLastPreparationImageId.mockReturnValue('img1');

        const contentWithNo = {
            ...mockGlobalContent,
            label: {
                leyenda_imagenes_ia: {
                    text: 'No'
                }
            }
        };

        render(<AIImageDisclaimer globalContent={contentWithNo} />);

        expect(
            screen.queryByText(/Las imágenes utilizadas en la preparación/i)
        ).not.toBeInTheDocument();
    });

    it('does NOT render when there are no preparation images', () => {
        helpers.useLastPreparationImageId.mockReturnValue(null);

        render(<AIImageDisclaimer globalContent={mockGlobalContent} />);

        expect(
            screen.queryByText(/Las imágenes utilizadas en la preparación/i)
        ).not.toBeInTheDocument();
    });

    it('renders by default when field is missing (retrocompatibility)', () => {
        helpers.useLastPreparationImageId.mockReturnValue('img1');

        const contentWithoutField = {
            content_elements: mockGlobalContent.content_elements,
            label: {}
        };

        render(<AIImageDisclaimer globalContent={contentWithoutField} />);

        expect(
            screen.getByText(/Las imágenes utilizadas en la preparación/i)
        ).toBeInTheDocument();
    });

    it('handles case-insensitive "no" value', () => {
        helpers.useLastPreparationImageId.mockReturnValue('img1');

        const contentWithLowercaseNo = {
            ...mockGlobalContent,
            label: {
                leyenda_imagenes_ia: {
                    text: 'no'
                }
            }
        };

        render(<AIImageDisclaimer globalContent={contentWithLowercaseNo} />);

        expect(
            screen.queryByText(/Las imágenes utilizadas en la preparación/i)
        ).not.toBeInTheDocument();
    });

    it('handles empty globalContent object', () => {
        helpers.useLastPreparationImageId.mockReturnValue(null);

        render(<AIImageDisclaimer globalContent={{}} />);

        expect(
            screen.queryByText(/Las imágenes utilizadas en la preparación/i)
        ).not.toBeInTheDocument();
    });

    it('renders with proper styling classes', () => {
        helpers.useLastPreparationImageId.mockReturnValue('img1');

        const { container } = render(
            <AIImageDisclaimer globalContent={mockGlobalContent} />
        );

        const wrapper = container.querySelector('.flex.flex-column.gap-16');
        expect(wrapper).toBeInTheDocument();
    });
});
