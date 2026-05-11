import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import AdsStrategySelector from '../../../../../components/features/LN/common/adsManager/components/adsStrategySelector';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../components/features/LN/common/adsManager/default',
    () => () => <div data-testid="ads-manager" />
);

jest.mock(
    '../../../../../components/private/common/banners/LoadBannersSSR',
    () => () => <div data-testid="load-banners-ssr" />
);

describe('components - features - LN - common - adsManager - adsStrategySelector', () => {
    it('renders AdsManager for /salud', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: { _id: '/salud' }
        });
        render(<AdsStrategySelector />);
        expect(screen.getByTestId('ads-manager')).toBeInTheDocument();
        expect(
            screen.queryByTestId('load-banners-ssr')
        ).not.toBeInTheDocument();
    });

    it('renders AdsManager for /ciencia', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: { _id: '/ciencia' }
        });
        render(<AdsStrategySelector />);
        expect(screen.getByTestId('ads-manager')).toBeInTheDocument();
        expect(
            screen.queryByTestId('load-banners-ssr')
        ).not.toBeInTheDocument();
    });

    it('renders AdsManager for /tecnologia', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: { _id: '/tecnologia' }
        });
        render(<AdsStrategySelector />);
        expect(screen.getByTestId('ads-manager')).toBeInTheDocument();
        expect(
            screen.queryByTestId('load-banners-ssr')
        ).not.toBeInTheDocument();
    });

    it('renders AdsManager for /sociedad', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: { _id: '/sociedad' }
        });
        render(<AdsStrategySelector />);
        expect(screen.getByTestId('ads-manager')).toBeInTheDocument();
        expect(
            screen.queryByTestId('load-banners-ssr')
        ).not.toBeInTheDocument();
    });

    it('renders LoadBannersSSR for non-allowed section (/economia)', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: { _id: '/economia' }
        });
        render(<AdsStrategySelector />);
        expect(screen.getByTestId('load-banners-ssr')).toBeInTheDocument();
        expect(screen.queryByTestId('ads-manager')).not.toBeInTheDocument();
    });

    it('renders LoadBannersSSR when globalContent is undefined', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: undefined
        });
        render(<AdsStrategySelector />);
        expect(screen.getByTestId('load-banners-ssr')).toBeInTheDocument();
        expect(screen.queryByTestId('ads-manager')).not.toBeInTheDocument();
    });
});
