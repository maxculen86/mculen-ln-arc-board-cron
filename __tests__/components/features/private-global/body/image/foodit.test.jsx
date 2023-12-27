import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from '../../../../../../components/features/private-global/body/image/foodit';

describe('BodyComponents - Foodit - Image', () => {
    const mockData = {
        caption: 'Test Caption',
        url: 'test-url.jpg',
        resized_urls: []
    };

    it('renders the image with correct src and alt', () => {
        render(<Image data={mockData} />);
        const imageElement = screen.getByAltText('Test Caption');
        expect(imageElement).toHaveAttribute('src', 'test-url.jpg');
    });
});
