import React from 'react';
import { render, screen } from '@testing-library/react';
import IaContent from '../../../../../../components/features/LN-10/IA/common/iaContent';
import '@testing-library/jest-dom';

describe('IaContent Component', () => {
    const contentDataGlossary = [
        { key: 'word1', value: 'Definition 1' },
        { key: 'WORD2', value: 'Definition 2' },
        { key: 'Word3', value: 'Definition 3' },
        { key: '4thWord', value: 'Definition 4' },
        { key: 'word 5', value: 'Definition 5' }
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
            expect(screen.getByText('Word1')).toBeInTheDocument();
            expect(screen.getByText('WORD2')).toBeInTheDocument();
            expect(screen.getByText('Word3')).toBeInTheDocument();
            expect(screen.getByText('4thWord')).toBeInTheDocument();
            expect(screen.getByText('Word 5')).toBeInTheDocument();
            expect(screen.getByText(value)).toBeInTheDocument();
        });
    });

    it('should render Disclaimer component', () => {
        render(<IaContent id={idGlossary} contentData={contentDataGlossary} />);
        const disclaimer = screen.getByText('Realizado con IA');
        expect(disclaimer).toBeInTheDocument();
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

    it('should match snapshot', () => {
        const { container } = render(
            <IaContent id={idGlossary} contentData={contentDataGlossary} />
        );
        expect(container).toMatchSnapshot();
    });
});
