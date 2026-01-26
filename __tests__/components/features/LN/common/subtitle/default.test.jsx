import React from 'react';
import { render, screen } from '@testing-library/react';
import Subtitle from '../../../../../../components/features/LN/common/subtitle/default';

describe('Subtitle', () => {
    it('should render an h2 with the content when the content prop is provided', () => {
        const content = 'Test subtitle';

        render(<Subtitle content={content} />);

        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(content);
    });

    it('should render nothing when the content prop is not provided', () => {
        const { container } = render(<Subtitle />);

        expect(container.firstChild).toBeNull();
    });
});
