import React from 'react';
import { render, screen } from '@testing-library/react';
import { FooterBase } from '../../../../../../components/features/LN/common/footer/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../../properties/sites/la-nacion-ar', () => ({
    layoutsName: {
        HomeLN10: 'HomeLN10'
    }
}));

jest.mock(
    '../../../../../../components/features/ui/ln/footer/default',
    () =>
        ({ children, ...props }) => <footer {...props}>{children}</footer>
);

jest.mock(
    '../../../../../../components/features/ui/ln/divider/default',
    () =>
        ({ ...props }) => <hr {...props} />
);

jest.mock(
    '../../../../../../components/features/ui/ln/link/default',
    () =>
        ({ children, ...props }) => <a {...props}>{children}</a>
);

jest.mock(
    '../../../../../../components/features/ui/ln/icon/default',
    () =>
        ({ children, ...props }) => <div {...props}>{children}</div>
);

jest.mock(
    '../../../../../../components/features/LN/common/footer/helpers/icons',
    () => ({
        getFooterIcons: jest.fn(() => ({
            laNacion: 'la-nacion-icon',
            facebook: 'facebook-icon',
            twitter: 'twitter-icon',
            instagram: 'instagram-icon',
            rss: 'rss-icon',
            storesAndroid: 'android-icon',
            storesIos: 'ios-icon',
            gdaXs: 'gda-icon',
            dataFiscal: 'data-fiscal-icon'
        }))
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/footer/helpers/utils',
    () => ({
        getEditionDetails: jest.fn(() => ({
            edNumber: 10000,
            edDate: {
                date: '30 de enero de 2026',
                year: '2026'
            }
        }))
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/footer/components/FooterLinksSection',
    () => ({
        FooterLinksSection: jest.fn(() => (
            <div data-testid="footer-links-section" />
        ))
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/footer/components/FooterEditionInfo',
    () => ({
        FooterEditionInfo: jest.fn(() => (
            <div data-testid="footer-edition-info" />
        ))
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/footer/components/FooterCopyright',
    () => ({
        FooterCopyright: jest.fn(() => <div data-testid="footer-copyright" />)
    })
);

const { useAppContext } = require('fusion:context');

describe('FooterBase', () => {
    const mockUseAppContext = {
        contextPath: '/pf',
        deployment: jest.fn(url => url),
        layout: 'default'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useAppContext.mockReturnValue(mockUseAppContext);
    });

    it('should render the footer with all sections', () => {
        render(<FooterBase />);

        expect(screen.getByTestId('footer-links-section')).toBeInTheDocument();
        expect(screen.getByTestId('footer-copyright')).toBeInTheDocument();
    });

    it('should render edition info only when layout is HomeLN10', () => {
        const { rerender } = render(<FooterBase />);
        expect(
            screen.queryByTestId('footer-edition-info')
        ).not.toBeInTheDocument();

        useAppContext.mockReturnValue({
            ...mockUseAppContext,
            layout: 'HomeLN10'
        });
        rerender(<FooterBase />);
        expect(screen.getByTestId('footer-edition-info')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<FooterBase />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
