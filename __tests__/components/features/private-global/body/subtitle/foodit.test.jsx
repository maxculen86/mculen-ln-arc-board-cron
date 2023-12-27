import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Subtitle from '../../../../../../components/features/private-global/body/subtitle/foodit';

describe('BodyComponents - Foodit - Subtitle', () => {
    it('renders h2 by default if no level is provided', () => {
        render(<Subtitle data={{ content: 'Test Content' }} />);
        const subtitleElement = screen.getByText('Test Content');
        expect(subtitleElement.tagName).toBe('H2');
    });

    it('renders the correct subtitle level', () => {
        const levels = [1, 2, 3, 4, 5, 6];
        levels.forEach(level => {
            render(
                <Subtitle data={{ level: level, content: `Level ${level}` }} />
            );
            const subtitleElement = screen.getByText(`Level ${level}`);
            expect(subtitleElement.tagName).toBe(`H${level}`);
        });
    });

    it('applies correct class names based on level', () => {
        const testData = {
            1: 'text-28 text-32_md text-36_lg',
            2: 'text-24 text-28_md text-32_lg',
            3: 'text-24',
            4: 'text-24',
            5: 'text-24',
            6: 'text-24'
        };

        Object.entries(testData).forEach(([level, className]) => {
            render(
                <Subtitle
                    data={{
                        level: parseInt(level),
                        content: `Test Content ${level}`
                    }}
                />
            );
            const subtitleElement = screen.getByText(`Test Content ${level}`);
            expect(subtitleElement).toHaveClass(
                `prumo prumo-light ${className}`
            );
        });
    });

    it('renders content correctly using dangerouslySetInnerHTML', () => {
        const htmlContent = '<span>Test Content</span>';
        render(<Subtitle data={{ content: htmlContent }} />);
        const subtitleElement = screen.getByText('Test Content');
        expect(subtitleElement.parentElement.innerHTML).toBe(htmlContent);
    });
});
