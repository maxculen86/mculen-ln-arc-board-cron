import React from 'react';
import { useAppContext } from 'fusion:context';
import { render, screen } from '@testing-library/react';
import { validateCarruselChildren } from '../../../../components/chains/utils/validateCarruselChildren';
import { useRoofData } from '../../../../components/chains/utils/_helpers';
import CajaCarruselHorizontal from '../../../../components/chains/LN10_Caja_Carrusel_Horizontal/default';

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

jest.mock(
    '../../../../components/features/private-global/common/utils/hideParentNode',
    () => jest.fn()
);

describe('components - chains - LN10_Caja_Carrusel_Horizontal', () => {
    useAppContext.mockReturnValue({
        contextPath: '/test-path',
        deployment: jest.fn(path => path)
    });

    const mockRoofData = {
        someData: 'mockData'
    };

    const childPropBase = {
        collection: 'features',
        type: 'LN-10/itemCarruselHorizontal',
        id: 'f0fT3DeljGTD3Xg',
        customFields: {
            video: '551Qg3uY'
        }
    };

    const defaultProps = {
        children: [<div key="1">Child 1</div>, <div key="2">Child 2</div>],
        customFields: {
            hideCarousel: false,
            enabledDays: [],
            shouldSchedule: false,
            roofProp: 'mockRoofProp'
        },
        siteProperties: { layoutsName: { HomeLN10: 'LN10-Home_Main' } },
        layout: 'LN10-LN-Home_Sports',
        childProps: [childPropBase, childPropBase],
        chainId: 'test-chain-id',
        renderables: []
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
            message:
                'Advertencia. Se requiere la carga de items de carrusel horizontal.'
        });

        render(<CajaCarruselHorizontal {...defaultProps} />);

        expect(
            screen.getByText(
                /Advertencia. Se requiere la carga de items de carrusel horizontal./i
            )
        ).toBeInTheDocument();
    });

    it('renders nothing if hideCarousel is true', () => {
        render(
            <CajaCarruselHorizontal
                {...defaultProps}
                customFields={{
                    hideCarousel: true,
                    enabledDays: [],
                    shouldSchedule: false
                }}
            />
        );

        expect(screen.queryByText(/child 1/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/child 2/i)).not.toBeInTheDocument();
    });

    it('renders the carousel with children when no error and hideCarousel is false', () => {
        render(<CajaCarruselHorizontal {...defaultProps} />);

        expect(screen.getByText(/child 1/i)).toBeInTheDocument();
        expect(screen.getByText(/child 2/i)).toBeInTheDocument();
    });

    it('renders the component with roofData', () => {
        render(<CajaCarruselHorizontal {...defaultProps} />);

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

    it('validates children with isHorizontal flag set to true', () => {
        render(<CajaCarruselHorizontal {...defaultProps} />);

        expect(validateCarruselChildren).toHaveBeenCalledWith({
            children: defaultProps.children,
            childProps: defaultProps.childProps,
            allowedChildren: ['LN-10/itemCarruselHorizontal'],
            isHorizontal: true
        });
    });

    it('renders section with data-chain-id attribute', () => {
        const { container } = render(
            <CajaCarruselHorizontal {...defaultProps} />
        );
        const section = container.querySelector(
            'section[data-chain-id="test-chain-id"]'
        );

        expect(section).toBeInTheDocument();
    });

    it('renders MediaScrollerExpandedWrapper component', () => {
        render(<CajaCarruselHorizontal {...defaultProps} />);

        expect(screen.getByText(/child 1/i)).toBeInTheDocument();
    });

    it('should not render when hide is true due to schedule', () => {
        useAppContext.mockReturnValue({ isAdmin: false });
        const propsWithSchedule = {
            ...defaultProps,
            customFields: {
                ...defaultProps.customFields,
                shouldSchedule: true,
                enabledDays: ['lunes']
            }
        };

        const originalDate = Date;
        const mockDate = new Date('2026-01-13'); // Tuesday
        global.Date = jest.fn(() => mockDate);
        global.Date.now = originalDate.now;

        render(<CajaCarruselHorizontal {...propsWithSchedule} />);

        global.Date = originalDate;
    });

    it('should render on Home layout', () => {
        const propsWithHomeLayout = {
            ...defaultProps,
            layout: 'LN10-Home_Main'
        };

        render(<CajaCarruselHorizontal {...propsWithHomeLayout} />);

        expect(screen.getByText(/child 1/i)).toBeInTheDocument();
        expect(screen.getByText(/child 2/i)).toBeInTheDocument();
    });

    it('should only allow LN-10/itemCarruselHorizontal children', () => {
        render(<CajaCarruselHorizontal {...defaultProps} />);

        expect(validateCarruselChildren).toHaveBeenCalledWith(
            expect.objectContaining({
                allowedChildren: ['LN-10/itemCarruselHorizontal']
            })
        );
    });

    it('should pass correct viewability data to roof', () => {
        const propsWithViewability = {
            ...defaultProps,
            chainId: 'viewability-test',
            renderables: [{ id: '1' }, { id: '2' }]
        };

        render(<CajaCarruselHorizontal {...propsWithViewability} />);

        expect(screen.getByText(/child 1/i)).toBeInTheDocument();
    });
});
