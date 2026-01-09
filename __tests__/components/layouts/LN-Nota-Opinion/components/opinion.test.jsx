import React from 'react';
import { render, screen } from '@testing-library/react';
import Opinion from '../../../../../components/layouts/LN-Nota-Opinion/components/opinion';

describe('Opinion', () => {
    it('renders children inside Opinion component', () => {
        render(
            <Opinion data-testid="opinion-test-id">
                <p>Opinion text</p>
            </Opinion>
        );

        expect(screen.getByTestId('opinion-test-id')).toBeInTheDocument();
        expect(screen.getByText('Opinion text')).toBeInTheDocument();
    });
});
