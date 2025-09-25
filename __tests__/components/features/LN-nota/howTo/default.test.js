import React from 'react';
import { render, screen } from '@testing-library/react';
import HowTo from '../../../../../components/features/LN-nota/howTo/default';

const testId = 'how-to-list';

const step = {
    number: 1,
    title: 'Paso 1'
};

describe('HowTo component', () => {
    it('Should render correctly', () => {
        render(<HowTo data-testid={testId} {...step} />);
        expect(screen.getByText(step.title)).toBeInTheDocument();
        expect(screen.getByTestId(testId)).toMatchSnapshot();
    });

    it("Shouldn't render if no number is provided", () => {
        render(<HowTo data-testid={testId} title={step.title} />);
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });

    it("Shouldn't render if no title is provided", () => {
        render(<HowTo data-testid={testId} number={step.number} />);
        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
});
