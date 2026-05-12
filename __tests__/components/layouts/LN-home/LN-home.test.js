import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LNSportsHome from '../../../../components/layouts/LN-Home_Sports/default.jsx';

jest.mock('fusion:consumer', () => Component => Component);
jest.mock('fusion:static', () => ({ children }) => <div>{children}</div>);

jest.mock(
    '../../../../components/features/LN-10-global/header/default',
    () => () => <div data-testid="header" />
);
jest.mock('../../../../components/private/LN10/footer', () => () => (
    <div data-testid="footer" />
));
jest.mock(
    '../../../../components/private/common/context/globalContext',
    () =>
        ({ children }) => <div>{children}</div>
);
jest.mock(
    '../../../../components/private/LN/acumulado/context/globalContextAcu',
    () => ({
        GlobalProviderAcu: ({ children }) => <div>{children}</div>
    })
);
jest.mock(
    '../../../../components/features/LN/common/adsManager/components/adsStrategySelector',
    () => () => null
);
jest.mock(
    '../../../../components/features/LN-10-global/pwaModal/default',
    () => () => null
);
jest.mock(
    '../../../../components/layouts/helpers/initCtrlGrp',
    () => () => null
);

const layoutChildren = [
    <div key="0" data-testid="bannerMegatop">
        Banner Megatop
    </div>,
    <div key="1" data-testid="stickyMobile">
        Sticky Mobile
    </div>,
    <div key="2" data-testid="cabezal">
        Cabezal
    </div>,
    <div key="3" data-testid="apertura">
        Apertura
    </div>,
    <div key="4" data-testid="cuerpo">
        Cuerpo
    </div>,
    <div key="5" data-testid="aside">
        Aside
    </div>
];

describe('Layout - LN-Home_Sports', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <LNSportsHome globalContent={{}} children={layoutChildren} />
        );
        expect(container).toBeTruthy();
    });

    it('renders the header', () => {
        render(<LNSportsHome globalContent={{}} children={layoutChildren} />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('renders the footer', () => {
        render(<LNSportsHome globalContent={{}} children={layoutChildren} />);
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('renders all children slots', () => {
        render(<LNSportsHome globalContent={{}} children={layoutChildren} />);
        expect(screen.getByTestId('bannerMegatop')).toBeInTheDocument();
        expect(screen.getByTestId('cabezal')).toBeInTheDocument();
        expect(screen.getByTestId('apertura')).toBeInTheDocument();
        expect(screen.getByTestId('cuerpo')).toBeInTheDocument();
        expect(screen.getByTestId('aside')).toBeInTheDocument();
    });
});
