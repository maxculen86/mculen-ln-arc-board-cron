import React from 'react';
import { render, screen } from '@testing-library/react';
import Opinion from '../../../../../components/layouts/LN-Nota-Opinion/components/opinion';

jest.mock(
    '../../../../../components/features/LN-10-global/common/baseLayout/default.jsx',
    () => ({
        BaseLayout: ({ children }) => (
            <div data-testid="base-layout">{children}</div>
        )
    })
);

describe('Opinion', () => {
    it('renders children inside BaseLayout and main content', () => {
        render(
            <Opinion>
                <p>Opinion text</p>
            </Opinion>
        );

        expect(screen.getByTestId('base-layout')).toBeInTheDocument();

        const main = document.querySelector('main#content');
        expect(main).toBeInTheDocument();
        expect(screen.getByText('Opinion text')).toBeInTheDocument();
    });
});
