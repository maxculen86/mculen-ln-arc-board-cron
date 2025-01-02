import React from 'react';
import { render, screen } from '@testing-library/react';
import IaTab from '../../../../../../components/features/LN-10/IA/common/iaTab';

describe('IaTab component', () => {
    it('should return null when props is not provided', () => {
        const { container } = render(<IaTab />);
        expect(container.firstChild).toBeNull();
    });
    it('should return null if "id" is undefined', () => {
        const { container } = render(<IaTab title="title" />);
        expect(container.firstChild).toBeNull();
    });
    it('should return null if "title" is undefined', () => {
        const { container } = render(<IaTab id="summary" />);
        expect(container.firstChild).toBeNull();
    });
    it('should render titles correctly', () => {
        render(<IaTab id="summary" title="exampleTitle" />);
        const summaryTitle = screen.getByText('exampleTitle');

        expect(summaryTitle).toBeTruthy();
    });

    it('matches snapshot when id is "glossary"', () => {
        const { container } = render(<IaTab id="glossary" title="Glossary" />);
        expect(container).toMatchSnapshot();
    });

    it('matches snapshot when id is "summary"', () => {
        const { container } = render(<IaTab id="summary" title="Summary" />);
        expect(container).toMatchSnapshot();
    });
});
