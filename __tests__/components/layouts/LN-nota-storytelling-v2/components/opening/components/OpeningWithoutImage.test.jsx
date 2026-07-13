import React from 'react';
import { render, screen } from '@testing-library/react';
import OpeningWithoutImage from '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningWithoutImage';

const mockOpeningAddons = jest.fn();
const mockOpeningTitles = jest.fn();

jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningAddons',
    () => ({
        __esModule: true,
        default: props => {
            mockOpeningAddons(props);
            return <div data-testid="opening-addons">OpeningAddons</div>;
        }
    })
);

jest.mock(
    '../../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/components/OpeningTitles',
    () => ({
        __esModule: true,
        default: props => {
            mockOpeningTitles(props);
            return (
                <div data-testid="opening-titles">
                    <h1>{props.h1Props?.text}</h1>
                    <h2>{props.h2Props?.text}</h2>
                </div>
            );
        }
    })
);

jest.mock(
    '../../../../../../../components/features/ui/ln/divider/default',
    () => ({
        __esModule: true,
        default: ({ className, color }) => (
            <hr
                data-testid="divider"
                className={className}
                data-color={color}
            />
        )
    })
);

describe('OpeningWithoutImage', () => {
    const mockProps = {
        globalContent: { id: 'article-123' },
        layout: 'without-image',
        title1: 'Main Title',
        title2: 'Subtitle',
        subheadline: 'This is the subheadline',
        diagram: 'without-image'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('section', () => {
        it('should render the section with the without-image data-diagram', () => {
            const { container } = render(
                <OpeningWithoutImage {...mockProps} />
            );

            expect(
                container.querySelector('[data-diagram="without-image"]')
            ).toBeInTheDocument();
        });

        it('should render the section with the top spacing classes', () => {
            const { container } = render(
                <OpeningWithoutImage {...mockProps} />
            );

            const section = container.querySelector(
                '[data-diagram="without-image"]'
            );
            expect(section).toHaveClass('w-full', 'pt-40', 'md:pt-80');
        });
    });

    describe('OpeningAddons', () => {
        it('should render the addons', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            expect(screen.getByTestId('opening-addons')).toBeInTheDocument();
        });

        it('should pass the diagram prop to the addons', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            expect(mockOpeningAddons).toHaveBeenCalledWith(
                expect.objectContaining({ diagram: 'without-image' })
            );
        });

        it('should pass globalContent and layout to the addons', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            expect(mockOpeningAddons).toHaveBeenCalledWith(
                expect.objectContaining({
                    globalContent: mockProps.globalContent,
                    layout: 'without-image'
                })
            );
        });

        it('should pass the content lab classname to the addons', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            expect(mockOpeningAddons).toHaveBeenCalledWith(
                expect.objectContaining({
                    classnames: { contentLab: 'text-base-default' }
                })
            );
        });
    });

    describe('OpeningTitles', () => {
        it('should render the titles', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            const titles = screen.getByTestId('opening-titles');
            expect(titles).toHaveTextContent('Main Title');
            expect(titles).toHaveTextContent('Subtitle');
        });

        it('should pass centered alignment to the titles', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            expect(mockOpeningTitles).toHaveBeenCalledWith(
                expect.objectContaining({
                    h1Props: { text: 'Main Title', className: 'text-center' },
                    h2Props: { text: 'Subtitle', className: 'text-center' }
                })
            );
        });
    });

    describe('subheadline', () => {
        it('should render the subheadline paragraph when provided', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            expect(
                screen.getByText('This is the subheadline')
            ).toBeInTheDocument();
        });

        it('should render the subheadline with its layout classes', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            expect(screen.getByText('This is the subheadline')).toHaveClass(
                'font-primary',
                'text-subheading-md',
                'text-center',
                'max-w-635'
            );
        });

        it('should not render the subheadline paragraph when empty', () => {
            render(<OpeningWithoutImage {...mockProps} subheadline="" />);

            expect(
                screen.queryByText('This is the subheadline')
            ).not.toBeInTheDocument();
        });

        it('should not render the subheadline paragraph when undefined', () => {
            render(
                <OpeningWithoutImage {...mockProps} subheadline={undefined} />
            );

            expect(
                screen.queryByText('This is the subheadline')
            ).not.toBeInTheDocument();
        });
    });

    describe('divider', () => {
        it('should render a black divider with its layout classes', () => {
            render(<OpeningWithoutImage {...mockProps} />);

            const divider = screen.getByTestId('divider');
            expect(divider).toHaveAttribute('data-color', 'black');
            expect(divider).toHaveClass('w-80', 'min-w-80', 'max-w-80');
        });
    });

    describe('edge cases', () => {
        it('should render with minimal props', () => {
            render(<OpeningWithoutImage diagram="without-image" />);

            expect(screen.getByTestId('opening-addons')).toBeInTheDocument();
            expect(screen.getByTestId('opening-titles')).toBeInTheDocument();
            expect(screen.getByTestId('divider')).toBeInTheDocument();
        });

        it('should handle special characters in titles and subheadline', () => {
            render(
                <OpeningWithoutImage
                    {...mockProps}
                    title1="Título con 'comillas' & símbolos"
                    subheadline='Párrafo con <etiquetas> y "comillas"'
                />
            );

            expect(
                screen.getByText("Título con 'comillas' & símbolos")
            ).toBeInTheDocument();
            expect(
                screen.getByText('Párrafo con <etiquetas> y "comillas"')
            ).toBeInTheDocument();
        });
    });

    describe('snapshots', () => {
        it('matches snapshot with all props', () => {
            const { asFragment } = render(
                <OpeningWithoutImage {...mockProps} />
            );

            expect(asFragment()).toMatchSnapshot();
        });

        it('matches snapshot without subheadline', () => {
            const { asFragment } = render(
                <OpeningWithoutImage {...mockProps} subheadline="" />
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
