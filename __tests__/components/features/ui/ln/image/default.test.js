import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from '../../../../../../components/features/ui/ln/image/default';

jest.mock('fusion:environment', () => ({
    __esModule: true,
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
    SITE_LANACION: 'https://sandbox.lanacion.com.ar'
}));

describe('components - features - ui - ln - image', () => {
    const { getByTestId } = screen;
    beforeEach(() => {
        jest.clearAllMocks();
    });
    const commonProps = {
        src: 'test.jpg',
        'data-testid': 'ds-image'
    };

    describe('Custom props integration', () => {
        it('should apply default objectFit="contain"', () => {
            render(<Image {...commonProps} />);
            const image = getByTestId('ds-image');

            expect(image).toHaveClass('object-contain');
        });

        it('should apply custom classnames to image and placeholder', () => {
            const customClassnames = {
                placeholder: 'custom-placeholder',
                image: 'custom-image'
            };

            render(<Image {...commonProps} classnames={customClassnames} />);
            const image = getByTestId('ds-image');
            const placeholder = getByTestId('image-placeholder');

            expect(placeholder).toHaveClass(
                'absolute inset-0 z-0 bg-muted bg-[url("/pf/resources/images/ln-placeholder.svg")] bg-no-repeat bg-center bg-[length:67px] custom-placeholder'
            );
            expect(image).toHaveClass('h-full w-full custom-image');
        });

        it('should apply default classes when no custom classnames provided', () => {
            render(<Image {...commonProps} />);

            const image = getByTestId('ds-image');
            const placeholder = getByTestId('image-placeholder');

            expect(image).toHaveClass('h-full w-full');
            expect(placeholder).toHaveClass(
                'bg-[url("/pf/resources/images/ln-placeholder.svg")] bg-no-repeat bg-center bg-[length:67px]'
            );
        });
    });

    describe('Props Passthrough', () => {
        it('should pass through additional props to DS component', () => {
            render(
                <Image
                    {...commonProps}
                    alt="Test image"
                    id="custom-id"
                    data-custom="test-value"
                />
            );

            const image = getByTestId('ds-image');
            expect(image).toHaveAttribute('src', 'test.jpg');
            expect(image).toHaveAttribute('alt', 'Test image');
            expect(image).toHaveAttribute('id', 'custom-id');
            expect(image).toHaveAttribute('data-custom', 'test-value');
        });

        it('should render a plain img when renderImgOnly is enabled', () => {
            render(
                <Image
                    {...commonProps}
                    renderImgOnly
                    alt="Hero image"
                    srcSet="test.jpg 420w, hero.jpg 1200w"
                    sizes="100vw"
                />
            );

            const image = getByTestId('ds-image');
            expect(image.tagName).toBe('IMG');
            expect(image).toHaveAttribute(
                'srcset',
                'test.jpg 420w,hero.jpg 1200w'
            );
            expect(image).toHaveAttribute('sizes', '100vw');
            expect(
                screen.queryByTestId('image-placeholder')
            ).not.toBeInTheDocument();
        });

        it('should normalize resizer host in src and srcSet preserving params', () => {
            render(
                <Image
                    {...commonProps}
                    renderImgOnly
                    alt="Hero image"
                    src="https://resizer.glanacion.com/resizer/v2/test.jpg?width=420&height=280&quality=70&smart=true"
                    srcSet="https://resizer.glanacion.com/resizer/v2/test.jpg?width=420&height=280&quality=70&smart=true 420w, https://sandbox-resizer.glanacion.com/resizer/v2/test.jpg?width=1200&height=800&quality=70&smart=true 1200w"
                />
            );

            const image = getByTestId('ds-image');

            expect(image).toHaveAttribute(
                'src',
                'https://sandbox.lanacion.com.ar/resizer/v2/test.jpg?width=420&height=280&quality=70&smart=true'
            );
            expect(image).toHaveAttribute(
                'srcset',
                'https://sandbox.lanacion.com.ar/resizer/v2/test.jpg?width=420&height=280&quality=70&smart=true 420w,https://sandbox.lanacion.com.ar/resizer/v2/test.jpg?width=1200&height=800&quality=70&smart=true 1200w'
            );
        });
    });

    describe('DOM Structure Tracking', () => {
        it('should maintain expected DOM structure with default props', () => {
            const { asFragment } = render(<Image src="test.jpg" />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('should maintain expected DOM structure with custom classnames', () => {
            const { asFragment } = render(
                <Image
                    src="test.jpg"
                    alt="Custom image"
                    classnames={{
                        wrapper: 'custom-wrapper',
                        image: 'custom-image',
                        placeholder: 'custom-placeholder'
                    }}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('should maintain expected DOM structure with error state', () => {
            const mockRef = { current: null };
            const useRefSpy = jest
                .spyOn(React, 'useRef')
                .mockReturnValue(mockRef);

            const mockSetError = jest.fn();
            const useStateSpy = jest
                .spyOn(React, 'useState')
                .mockReturnValueOnce([true, mockSetError]);

            const useEffectSpy = jest
                .spyOn(React, 'useEffect')
                .mockImplementation(() => {});

            const { asFragment } = render(<Image src="broken.jpg" />);
            expect(asFragment()).toMatchSnapshot();

            useRefSpy.mockRestore();
            useStateSpy.mockRestore();
            useEffectSpy.mockRestore();
        });
    });
});
