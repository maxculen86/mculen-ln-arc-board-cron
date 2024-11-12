import React from 'react';
import { render, screen } from '@testing-library/react';
import IaContent from '../../../../../../components/features/LN-10/IA/common/iaContent';
import '@testing-library/jest-dom';

jest.mock(
    '../../../../../../components/features/LN-10-global/glossary/components/disclaimer',
    () => ({
        Disclaimer: () => <div data-testid="disclaimer">Disclaimer</div>
    })
);

describe('IaContent Component', () => {
    const contentDataGlossary = [
        { key: 'Word1', value: 'Definition 1' },
        { key: 'Word2', value: 'Definition 2' }
    ];
    const contentDataSummary = ['Paragraph 1', 'Paragraph 2'];
    const idSummary = 'summary';
    const idGlossary = 'glossary';
    it('should return null if contentData is empty and id is summary', () => {
        const { container } = render(
            <IaContent id={idSummary} contentData={[]} />
        );
        expect(container.firstChild).not.toBeInTheDocument();
    });
    it('should return null if contentData is empty and id is glossary', () => {
        const { container } = render(
            <IaContent id={idGlossary} contentData={[]} />
        );
        expect(container.firstChild).not.toBeInTheDocument();
    });
    it('should render summary list when id is "summary" and contentData is provided', () => {
        render(<IaContent id={idSummary} contentData={contentDataSummary} />);

        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(contentDataSummary.length);
        listItems.forEach((item, index) => {
            expect(item).toHaveTextContent(contentDataSummary[index]);
        });
    });

    it('should render glossary list when id is "glossary" and contentData is provided', () => {
        render(<IaContent id={idGlossary} contentData={contentDataGlossary} />);

        contentDataGlossary.forEach(({ key, value }) => {
            expect(screen.getByText(key)).toBeInTheDocument();
            expect(screen.getByText(value)).toBeInTheDocument();
        });
    });

    it('should render Disclaimer component', () => {
        render(<IaContent id={idGlossary} contentData={contentDataGlossary} />);
        const disclaimer = screen.getByTestId('disclaimer');
        expect(disclaimer).toBeInTheDocument();
        expect(disclaimer).toHaveTextContent('Disclaimer');
    });

    it('should apply custom className if provided', () => {
        const className = 'custom-class';
        const { container } = render(
            <IaContent
                id={idGlossary}
                contentData={contentDataGlossary}
                className={className}
            />
        );
        expect(container.firstChild).toHaveClass(className);
    });
});
