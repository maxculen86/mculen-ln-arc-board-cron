import React from 'react';
import { useAppContext } from 'fusion:context';
import { render, screen } from '@testing-library/react';
import { validateCarruselChildren } from '../../../../components/chains/utils/validateCarruselChildren';
import { useRoofData } from '../../../../components/chains/utils/_helpers';
import CajaCarrusel from '../../../../components/chains/LN10_Caja_Carrusel/default';

jest.mock(
    '../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/wrapper',
    () => ({
        __esModule: true,
        default: ({ children }) => (
            <div data-testid="media-scroller-expanded-wrapper">{children}</div>
        )
    })
);

jest.mock(
    '../../../../components/chains/LN10_Caja_Carrusel/components/mediaScrollerExpanded/mediaScrollerExpanded',
    () => ({
        __esModule: true,
        default: ({ variant }) => (
            <div data-testid="media-scroller-expanded" data-variant={variant} />
        )
    })
);

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../components/chains/utils/validateCarruselChildren',
    () => ({
        validateCarruselChildren: jest.fn()
    })
);

jest.mock('../../../../components/chains/utils/_helpers', () => ({
    useRoofData: jest.fn()
}));

describe('components - chains - LN10_Caja_Carrusel', () => {
    useAppContext.mockReturnValue({
        contextPath: '/test-path',
        deployment: jest.fn(path => path)
    });

    const mockRoofData = {
        someData: 'mockData'
    };

    const childPropBase = {
        collection: 'features',
        type: 'LN-10/itemCarrusel',
        id: 'f0fT3DeljGTD3Xg',
        customFields: {
            video: '551Qg3uY'
        }
    };

    const defaultProps = {
        children: [<div key="1">Child 1</div>, <div key="2">Child 2</div>],
        customFields: {
            hideCarousel: false,
            roofProp: 'mockRoofProp'
        },
        siteProperties: { layoutsName: { HomeLN10: 'LN10-Home_Main' } },
        layout: 'LN10-LN-Home_Sports',
        childProps: [
            childPropBase,
            {
                ...childPropBase,
                id: 'f0fT3DeljGTD3Xg-second',
                customFields: {
                    ...childPropBase.customFields,
                    video: '551Qg3uY-second'
                }
            }
        ],
        enabledDays: ['lunes', 'martes', 'miercoles']
    };

    beforeAll(() => {
        global.IntersectionObserver = jest.fn(() => ({
            observe: jest.fn(),
            disconnect: jest.fn(),
            unobserve: jest.fn()
        }));
        global.ResizeObserver = jest.fn().mockImplementation(() => ({
            observe: jest.fn(),
            unobserve: jest.fn(),
            disconnect: jest.fn()
        }));
        global.window.LN = {
            observable: {
                publish: jest.fn()
            }
        };
    });

    beforeEach(() => {
        useAppContext.mockReturnValue({ isAdmin: false });
        useRoofData.mockReturnValue(mockRoofData);
        validateCarruselChildren.mockReturnValue(null);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders a warning message if isAdmin is true and there is an error', () => {
        useAppContext.mockReturnValue({ isAdmin: true });
        validateCarruselChildren.mockReturnValue({
            type: 'error',
            message: 'Advertencia. Se requiere la carga de 5 items de carrusel.'
        });

        render(<CajaCarrusel {...defaultProps} />);

        expect(
            screen.getByText(
                /Advertencia. Se requiere la carga de 5 items de carrusel./i
            )
        ).toBeInTheDocument();
    });

    it('renders nothing if hideCarousel is true', () => {
        render(
            <CajaCarrusel
                {...defaultProps}
                customFields={{ hideCarousel: true }}
            />
        );

        expect(screen.queryByText(/child 1/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/child 2/i)).not.toBeInTheDocument();
    });

    it('renders the carousel with children when no error and hideCarousel is false', () => {
        render(<CajaCarrusel {...defaultProps} />);

        expect(screen.getByText(/child 1/i)).toBeInTheDocument();
        expect(screen.getByText(/child 2/i)).toBeInTheDocument();
    });

    it('renders the BuildRoof component with roofData', () => {
        render(<CajaCarrusel {...defaultProps} />);

        expect(screen.getByText(/child 1/i)).toBeInTheDocument();
        expect(useRoofData).toHaveBeenCalledWith({
            roofProp: 'mockRoofProp',
            enabledDays: [],
            isAdmin: false,
            isStatic: false,
            shouldLoadRoof: true,
            shouldSchedule: false
        });
    });

    it('limits the number of children to 20 in the carousel', () => {
        const manyChildren = Array.from({ length: 25 }, (_, i) => (
            <div key={i}>Child {i + 1}</div>
        ));
        const childProps = Array.from({ length: 25 }, (_, i) => ({
            ...childPropBase,
            id: `f0fT3DeljGTD3Xg${i}`
        }));

        render(
            <CajaCarrusel
                {...defaultProps}
                children={manyChildren}
                childProps={childProps}
            />
        );

        expect(screen.getAllByText(/child/i)).toHaveLength(20);
    });

    it('renders the per-chain expanded wrapper with the vertical variant', () => {
        render(<CajaCarrusel {...defaultProps} />);

        expect(
            screen.getByTestId('media-scroller-expanded-wrapper')
        ).toBeInTheDocument();
        expect(screen.getByTestId('media-scroller-expanded')).toHaveAttribute(
            'data-variant',
            'vertical'
        );
    });
});
