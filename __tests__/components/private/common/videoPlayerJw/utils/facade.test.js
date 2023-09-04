import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Facade } from '../../../../../../components/private/common/videoPlayerJw/utils/facade';

jest.mock('@ln/common-ui-adaptableimage', () => ({
    Adaptableimage: ({ sources, src, className }) => (
        <div data-testid="mock-adaptable-image" className={className}>
            <img src={src} alt="Mock Adaptableimage" />
        </div>
    )
}));

jest.mock(
    '../../../../../../components/private/common/videoPlayerJw/utils/helperJw',
    () => ({
        transformImages: images => images
    })
);

describe('components - private - common -videoPlayerJw', () => {
    const mockTitle = 'MockTitle';
    const mockPlaylist = [
        {
            images: ['image1.jpg', 'image2.jpg'],
            image: 'main-image.jpg'
        }
    ];
    it('should check that facade component renders correctly', () => {
        render(<Facade title={mockTitle} playlist={mockPlaylist} />);

        const facadeDiv = document.querySelector(`#facade-${mockTitle}`);
        expect(facadeDiv).toBeInTheDocument();

        const adaptableImage = screen.getByAltText('Mock Adaptableimage');
        expect(adaptableImage).toBeInTheDocument();
    });
});
