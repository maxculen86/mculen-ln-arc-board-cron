import React from 'react';
import { render } from '@testing-library/react';
import IconsFullScreen from '../../../../../../components/private/LN/common/media/iconsFullScreen';

describe('IconsFullScreen Component', () => {
    it('renders nothing when zoom and itsGallery are both false', () => {
        const { container } = render(<IconsFullScreen />);
        expect(container.firstChild).toBeNull();
    });

    it('renders close icon when active is true', () => {
        const { container } = render(
            <IconsFullScreen zoom={true} active={true} />
        );

        const iconContainer = container.querySelector('.cursor-pointer');
        expect(iconContainer).toBeInTheDocument();
        expect(iconContainer).toHaveClass('top-8', 'right-8');

        const mockIcon = container.querySelector('mock-icon');
        expect(mockIcon).toHaveAttribute('name', 'close');
        expect(mockIcon).toHaveAttribute('fill', '#fff');
    });

    it('renders fullscreen icon when conditions are met', () => {
        const { container } = render(
            <IconsFullScreen zoom={true} active={false} isApertura={false} />
        );

        const iconContainer = container.querySelector('.icon-zoom');
        expect(iconContainer).toBeInTheDocument();

        const mockIcon = container.querySelector('mock-icon');
        expect(mockIcon).toHaveAttribute('name', 'fullscreen');
        expect(mockIcon).toHaveAttribute('fill', '#fff');
    });

    it('does not render fullscreen icon when isApertura is true', () => {
        const { container } = render(
            <IconsFullScreen zoom={true} isApertura={true} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders when itsGallery is true even if zoom is false', () => {
        const { container } = render(
            <IconsFullScreen
                itsGallery={true}
                active={false}
                isApertura={false}
            />
        );

        const iconContainer = container.querySelector('.icon-zoom');
        expect(iconContainer).toBeInTheDocument();

        const mockIcon = container.querySelector('mock-icon');
        expect(mockIcon).toHaveAttribute('name', 'fullscreen');
    });

    describe('Snapshots', () => {
        it('should match snapshot when no icons are rendered (default props)', () => {
            const { asFragment } = render(<IconsFullScreen />);
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot with close icon (active state)', () => {
            const { asFragment } = render(
                <IconsFullScreen
                    zoom={true}
                    active={true}
                    itsGallery={false}
                    isApertura={false}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot with fullscreen icon (zoom enabled)', () => {
            const { asFragment } = render(
                <IconsFullScreen
                    zoom={true}
                    active={false}
                    itsGallery={false}
                    isApertura={false}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot with fullscreen icon (gallery enabled)', () => {
            const { asFragment } = render(
                <IconsFullScreen
                    zoom={false}
                    active={false}
                    itsGallery={true}
                    isApertura={false}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot when isApertura blocks rendering', () => {
            const { asFragment } = render(
                <IconsFullScreen
                    zoom={true}
                    active={false}
                    itsGallery={true}
                    isApertura={true}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot with all props enabled except isApertura', () => {
            const { asFragment } = render(
                <IconsFullScreen
                    zoom={true}
                    active={true}
                    itsGallery={true}
                    isApertura={false}
                />
            );
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
