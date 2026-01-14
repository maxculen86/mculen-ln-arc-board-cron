import React from 'react';
import { render, screen } from '@testing-library/react';
import LnNotaOpinion from '../../../../components/layouts/LN-Nota-Opinion/default';

jest.mock('fusion:consumer', () => Component => Component);

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        arcSite: 'la-nacion-ar',
        contextPath: '/pf',
        deployment: jest.fn(path => path)
    }))
}));

jest.mock('fusion:content', () => ({
    useContent: jest.fn(() => ({
        tooltips: [],
        banners: [],
        adserver: [],
        termicas: [],
        migration: {},
        notRecommendedSections: []
    }))
}));

jest.mock('fusion:static', () => ({
    __esModule: true,
    default: ({ children }) => (
        <div data-testid="static-component">{children}</div>
    )
}));

// Mock React's useContext to return the expected GlobalContext structure
jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: jest.fn(() => ({
            state: {
                siteService: {
                    termicas: [],
                    tooltips: [],
                    banners: [],
                    adserver: [],
                    migration: {},
                    notRecommendedSections: []
                }
            },
            dispatch: jest.fn()
        }))
    };
});

jest.mock(
    '../../../../components/private/common/context/globalContext.jsx',
    () => ({
        __esModule: true,
        default: ({ children }) => (
            <div data-testid="global-provider">{children}</div>
        )
    })
);

jest.mock('../../../../components/private/common/hooks/useTermica.js', () =>
    jest.fn(() => true)
);

jest.mock(
    '../../../../components/private/common/auth/AuthInitializer.jsx',
    () => ({
        __esModule: true,
        default: ({ children }) => (
            <div data-testid="auth-initializer">{children}</div>
        )
    })
);

jest.mock(
    '../../../../components/layouts/LN-Nota-Opinion/components/Opinion.jsx',
    () => ({
        __esModule: true,
        default: ({ children }) => <div data-testid="opinion">{children}</div>
    })
);

jest.mock(
    '../../../../components/features/LN/common/header/default.jsx',
    () => ({
        __esModule: true,
        default: () => <div data-testid="header">Header</div>
    })
);

jest.mock(
    '../../../../components/features/LN/common/footer/default.jsx',
    () => ({
        __esModule: true,
        default: () => <div data-testid="footer">Footer</div>
    })
);

jest.mock(
    '../../../../components/features/ui/ln/toastsContainer/default.jsx',
    () => ({
        __esModule: true,
        default: () => <div data-testid="toasts-container" />
    })
);

jest.mock('../../../../components/layouts/helpers/initCtrlGrp.jsx', () => ({
    __esModule: true,
    default: () => <div data-testid="init-control-group" />
}));

jest.mock(
    '../../../../components/private/common/banners/LoadBannersSSR.jsx',
    () => ({
        __esModule: true,
        default: () => <div data-testid="load-banners-ssr" />
    })
);

jest.mock(
    '../../../../components/features/LN/common/drawerSections/default.jsx',
    () => ({
        __esModule: true,
        default: () => <div data-testid="drawer-sections" />
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
            'Apertura',
            'Cuerpo',
            'Bottom',
            'Bottom-Tercera'
        ]);
    });
});
