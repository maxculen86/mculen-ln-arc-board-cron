import React from 'react';
import '@testing-library/jest-dom';
import { useAppContext } from 'fusion:context';
import { render, screen } from '@testing-library/react';
import LnRadio from '../../../../../components/features/LN-10/lnRadio/default';
import isTodayEnabled from '../../../../../components/chains/utils/isTodayEnabled';
import { shouldHideLnRadio } from '../../../../../components/features/LN-10/lnRadio/_helpers';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../components/chains/utils/isTodayEnabled', () =>
    jest.fn()
);

describe('Features - LaNacion - 10 - Radio', () => {
    useAppContext.mockReturnValue({
        contextPath: '/test-path',
        deployment: jest.fn(path => path)
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should not hide the feature when scheduling is disabled', () => {
        expect(
            shouldHideLnRadio({
                shouldSchedule: false,
                enabledDays: []
            })
        ).toBe(false);
    });

    it('should not hide the feature in admin mode', () => {
        expect(
            shouldHideLnRadio({
                isAdmin: true,
                shouldSchedule: true,
                enabledDays: []
            })
        ).toBe(false);
    });

    it('should hide the feature when scheduling is enabled and no days were configured', () => {
        expect(
            shouldHideLnRadio({
                shouldSchedule: true,
                enabledDays: []
            })
        ).toBe(true);
    });

    it('should hide the feature when today is not enabled', () => {
        isTodayEnabled.mockReturnValue(false);

        expect(
            shouldHideLnRadio({
                shouldSchedule: true,
                enabledDays: ['lunes']
            })
        ).toBe(true);
        expect(isTodayEnabled).toHaveBeenCalledWith(['lunes']);
    });

    it('should keep the feature visible when today is enabled', () => {
        isTodayEnabled.mockReturnValue(true);

        expect(
            shouldHideLnRadio({
                shouldSchedule: true,
                enabledDays: ['viernes']
            })
        ).toBe(false);
        expect(isTodayEnabled).toHaveBeenCalledWith(['viernes']);
    });
    describe('white background variant', () => {
        const props = {
            id: 'mockId',
            customFields: {
                variant: 'fondo-blanco'
            }
        };

        it('should render texts and links', () => {
            render(<LnRadio {...props} />);
            const buttonLink = screen.getByText('Escuchá + música');

            expect(
                screen.getByText('El mundo necesita más música')
            ).toBeInTheDocument();
            expect(buttonLink).toBeInTheDocument();
            expect(buttonLink).toHaveAttribute(
                'href',
                'https://masmusica.lanacion.com.ar/'
            );
        });

        it('should match snapshot', () => {
            const { container } = render(<LnRadio {...props} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('black background variant', () => {
        const props = {
            id: 'mockId',
            customFields: {
                variant: 'fondo-negro'
            }
        };

        it('should render texts and links', () => {
            render(<LnRadio {...props} />);
            const buttonLink = screen.getByText('Escuchá + música');

            expect(
                screen.getByText('El mundo necesita más música')
            ).toBeInTheDocument();
            expect(buttonLink).toBeInTheDocument();
            expect(buttonLink).toHaveAttribute(
                'href',
                'https://masmusica.lanacion.com.ar/'
            );
        });

        it('should match snapshot', () => {
            const { container } = render(<LnRadio {...props} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe('yellow background variant', () => {
        const props = {
            id: 'mockId',
            customFields: {
                variant: 'fondo-amarillo'
            }
        };

        it('should render texts and links', () => {
            render(<LnRadio {...props} />);
            const buttonLink = screen.getByText('Escuchá + música');

            expect(
                screen.getByText('El mundo necesita más música')
            ).toBeInTheDocument();
            expect(buttonLink).toBeInTheDocument();
            expect(buttonLink).toHaveAttribute(
                'href',
                'https://masmusica.lanacion.com.ar/'
            );
        });

        it('should match snapshot', () => {
            const { container } = render(<LnRadio {...props} />);
            expect(container).toMatchSnapshot();
        });
    });
});
