import React from 'react';
import { render, screen } from '@testing-library/react';
import CajaJuegos from '../../../../components/chains/LN10_Caja_Juegos/default';
import { useAppContext } from 'fusion:context';
import {
    useRoofData,
    useGetLinks
} from '../../../../components/chains/utils/_helpers';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock('../../../../components/chains/utils/_helpers', () => ({
    useRoofData: jest.fn(),
    useGetLinks: jest.fn()
}));

jest.mock(
    '../../../../components/private/common/scriptManager/GameEventsScript',
    () => {
        return jest.fn(() => <div id="mock-game-events-script" />);
    }
);

describe('CajaJuegos Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        useGetLinks.mockReturnValue([]);
        useRoofData.mockReturnValue({
            logoId: 'Criptograma',
            titleLink: 'link',
            hideRoof: false,
            links: []
        });
    });

    it('renders content when shouldShowGame is true and hideCaja is false', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                type: 'story',
                label: { mostrar_caja_juegos: { text: 'Mostrar' } }
            }
        });

        const customFields = { hideCaja: false };
        render(
            <CajaJuegos customFields={customFields}>
                <div data-testid="child">Child Content</div>
            </CajaJuegos>
        );

        expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('renders nothing when hideCaja is true', () => {
        useAppContext.mockReturnValue({
            globalContent: {}
        });

        const customFields = { hideCaja: true };
        render(
            <CajaJuegos customFields={customFields}>
                <div data-testid="child">Child Content</div>
            </CajaJuegos>
        );

        expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });
});
