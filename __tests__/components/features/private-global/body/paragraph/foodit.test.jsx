import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Paragraph from '../../../../../../components/features/private-global/body/paragraph/foodit';

describe('BodyComponents - Foodit - Paragraph', () => {
    it('renders with correct content', () => {
        const htmlContent = '<span>Test Content</span>';
        render(<Paragraph data={{ content: htmlContent }} />);
        const paragraphElement = screen.getByText('Test Content');
        expect(paragraphElement.parentElement.innerHTML).toBe(htmlContent);
    });

    it('applies initial-letter-2 class when capital is true', () => {
        const htmlContent = 'Test Content';
        render(<Paragraph data={{ content: htmlContent }} capital={true} />);
        const paragraphElement = screen.getByText('Test Content');
        expect(paragraphElement).toHaveClass('initial-letter-2');
    });

    it('does not apply initial-letter-2 class when capital is false', () => {
        const htmlContent = 'Test Content';
        render(<Paragraph data={{ content: htmlContent }} capital={false} />);
        const paragraphElement = screen.getByText('Test Content');
        expect(paragraphElement).not.toHaveClass('initial-letter-2');
    });
});
