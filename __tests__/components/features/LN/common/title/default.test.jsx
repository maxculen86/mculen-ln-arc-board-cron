import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from '../../../../../../components/features/LN/common/title/default';

describe('Title', () => {
    it('should render an h1 with the content when the content prop is provided', () => {
        const content = 'Test title';

        render(<Title content={content} />);

        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(content);
    });

    it('should render nothing when the content prop is not provided', () => {
        const { container } = render(<Title />);

        expect(container.firstChild).toBeNull();
    });
});
