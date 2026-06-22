import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputSection from '../../../../../components/features/LN-10-global/desplegable/searchInput';
import InputSearch from '../../../../../components/features/LN-10-global/header/mainHeader/components/SearchLN';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

const mockUseAppContext = jest.fn();

jest.mock('fusion:context', () => ({
    useAppContext: (...args) => mockUseAppContext(...args)
}));

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) =>
        args
            .flatMap(a =>
                typeof a === 'object' && a !== null
                    ? Object.keys(a).filter(k => a[k])
                    : [a]
            )
            .filter(Boolean)
            .join(' ')
}));

jest.mock(
    '../../../../../components/features/ui/ln/formControl/default',
    () => {
        const { forwardRef } = require('react');
        const MockFormcontrol = forwardRef(({ children, className }, ref) => (
            <div ref={ref} data-testid="formcontrol" className={className}>
                {children}
            </div>
        ));
        MockFormcontrol.Input = props => (
            <input data-testid="formcontrol-input" {...props} />
        );
        MockFormcontrol.Adornment = ({ children }) => <div>{children}</div>;
        return { __esModule: true, default: MockFormcontrol };
    }
);

jest.mock('../../../../../components/features/ui/ln/icon/default', () => () => (
    <span />
));

jest.mock('../../../../../components/features/ui/ln/button/default', () => {
    const { forwardRef } = require('react');
    return {
        __esModule: true,
        default: forwardRef(({ children, onClick, ...props }, ref) => (
            <button ref={ref} onClick={onClick} {...props}>
                {children}
            </button>
        ))
    };
});

jest.mock(
    '../../../../../components/features/LN-10-global/common/voiceSearch/default',
    () => ({
        useVoiceSearch: () => ({
            shouldListen: false,
            listeningTime: '',
            startListening: jest.fn(),
            stopListening: jest.fn()
        })
    })
);

jest.mock(
    '../../../../../components/features/LN-10-global/header/context',
    () => ({
        useHeaderContext: () => ({ negative: false })
    })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('InputSection - click outside', () => {
    const onClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('call onClose when mouse down outside the container', () => {
        render(<InputSection collapsible isOpen onClose={onClose} />);
        fireEvent.mouseDown(document.body);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when mouse down inside the container', () => {
        render(<InputSection collapsible isOpen onClose={onClose} />);
        fireEvent.mouseDown(screen.getByTestId('formcontrol'));
        expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when isOpen is false', () => {
        render(<InputSection collapsible isOpen={false} onClose={onClose} />);
        fireEvent.mouseDown(document.body);
        expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when collapsible is false', () => {
        render(<InputSection collapsible={false} isOpen onClose={onClose} />);
        fireEvent.mouseDown(document.body);
        expect(onClose).not.toHaveBeenCalled();
    });
});

describe('InputSearch - isLayoutBuscador', () => {
    it('return null when layout is LnBuscador', () => {
        mockUseAppContext.mockReturnValue({
            layout: 'LnBuscador',
            siteProperties: { layoutsName: { LnBuscador: 'LnBuscador' } }
        });
        const { container } = render(
            <InputSearch isOpen={false} setIsOpen={jest.fn()} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('renders the component when the layout is not LnBuscador', () => {
        mockUseAppContext.mockReturnValue({
            layout: 'home',
            siteProperties: { layoutsName: { LnBuscador: 'LnBuscador' } }
        });
        const { container } = render(
            <InputSearch isOpen={false} setIsOpen={jest.fn()} />
        );
        expect(container.firstChild).not.toBeNull();
    });
});
