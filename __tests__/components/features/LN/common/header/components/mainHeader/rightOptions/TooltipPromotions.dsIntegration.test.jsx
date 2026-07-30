import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TooltipPromotions from '../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/TooltipPromotions';
import { useHeaderContext } from '../../../../../../../../../components/features/LN/common/header/context';

// A propósito NO se mockea el facade: se usa el Tooltip real del DS para validar
// que el contenido se desmonta del portal al cerrar (el customWrapper sin
// animación debe llamar onExitComplete). Un mock del facade no cubriría esto.
jest.mock(
    '../../../../../../../../../components/features/LN/common/header/context',
    () => ({
        useHeaderContext: jest.fn()
    })
);

describe('TooltipPromotions (integración con el DS)', () => {
    // JSX fresco en cada llamada: el context está mockeado (no reactivo), así
    // que hay que forzar el re-render con un elemento nuevo para que
    // TooltipPromotions vuelva a leer isSentinelInView.
    const promo = () => (
        <TooltipPromotions content="promo $990" defaultOpen>
            <a href="/x">trigger</a>
        </TooltipPromotions>
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('while the sentinel is in view', () => {
        it('should render the tooltip content in the portal', () => {
            useHeaderContext.mockReturnValue({
                isSentinelInView: true,
                isHome: true
            });

            render(promo());

            expect(screen.getByText('promo $990')).toBeInTheDocument();
        });
    });

    describe('when the sentinel leaves the viewport', () => {
        it('should unmount the tooltip content from the portal', () => {
            useHeaderContext.mockReturnValue({
                isSentinelInView: true,
                isHome: true
            });

            const { rerender } = render(promo());
            expect(screen.getByText('promo $990')).toBeInTheDocument();

            useHeaderContext.mockReturnValue({
                isSentinelInView: false,
                isHome: true
            });
            rerender(promo());

            expect(screen.queryByText('promo $990')).not.toBeInTheDocument();
        });
    });
});
