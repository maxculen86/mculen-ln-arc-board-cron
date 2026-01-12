import React from 'react';
import { render, screen } from '@testing-library/react';
import LnNotaOpinion from '../../../../components/layouts/LN-Nota-Opinion/default';

jest.mock('fusion:consumer', () => Component => Component);

jest.mock(
    '../../../../components/private/common/context/globalContext.jsx',
    () => ({
        __esModule: true,
        default: ({ children }) => (
            <div data-testid="global-provider">{children}</div>
        )
    })
);

jest.mock(
    '../../../../components/layouts/LN-Nota-Opinion/components/opinion.jsx',
    () => ({
        __esModule: true,
        default: ({ children }) => <div data-testid="opinion">{children}</div>
    })
);

describe('LnNotaOpinion', () => {
    it('renders children wrapped with GlobalProvider and Opinion', () => {
        render(
            <LnNotaOpinion>
                <div>Test content</div>
            </LnNotaOpinion>
        );

        expect(screen.getByTestId('global-provider')).toBeInTheDocument();
        expect(screen.getByTestId('opinion')).toBeInTheDocument();
        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('exposes correct pageBuilder sections', () => {
        expect(LnNotaOpinion.sections).toEqual([
            'Pre-Título',
            'Título',
            'Apertura',
            'Cuerpo',
            'Bottom',
            'Bottom-Tercera'
        ]);
    });
});
