import React from 'react';
import { render, screen } from '@testing-library/react';
import MediaIframe from '../../../../../../components/features/LN/common/iframe/default';

describe('MediaIframe', () => {
    it('should return null when html is not provided', () => {
        const { container } = render(<MediaIframe />);
        expect(container.firstChild).toBeNull();
    });

    it('should render html content when html is provided', () => {
        const html = '<p>Embed content</p>';

        render(<MediaIframe html={html} />);

        expect(screen.getByText('Embed content')).toBeInTheDocument();
    });

    it('should render raw html correctly', () => {
        const html = `
            <div>
                <h2>Title</h2>
                <iframe src="https://example.com" />
            </div>
        `;

        const { container } = render(<MediaIframe html={html} />);

        expect(container.querySelector('h2')).toHaveTextContent('Title');
        expect(container.querySelector('iframe')).toBeInTheDocument();
    });
});
