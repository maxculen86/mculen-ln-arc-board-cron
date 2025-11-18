import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BackButton } from '../../../../../../../components/features/foodit-global/common/Header/components/backButton';

jest.mock('../../../../../../../components/private/LN/common/utils/isSSR', () =>
    jest.fn(() => false)
);

jest.mock(
    '../../../../../../../components/features/foodit-global/common/utils/getAccessSource',
    () => ({
        getAccessSource: jest.fn(() => 'pwa')
    })
);

jest.mock('@ln/foodit-ui-button', () => ({
    Button: ({ children, ...props }) => (
        <button {...props} data-testid="mock-button">
            {children}
        </button>
    )
}));

jest.mock('@ln/common-ui-icon', () => ({
    Icon: ({ size, children }) => (
        <div data-testid="mock-icon" data-icon-size={size}>
            {children}
        </div>
    )
}));

jest.mock(
    '../../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => props => <i data-testid="mock-iconsprite" {...props} />
);
const ROOT_KEY = 'foodit_back_root_path';

describe('BackButton snapshot', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'location', {
            value: {
                ...window.location,
                pathname: '/segundo-paso'
            },
            writable: true
        });

        sessionStorage.setItem(ROOT_KEY, '/');

        Object.defineProperty(window.history, 'length', {
            value: 2
        });

        jest.spyOn(window.history, 'back').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
        sessionStorage.clear();
    });

    it('call a window.history.back() when clicked', () => {
        render(<BackButton variant="link" iconOnly={false} />);
        const btn = screen.getByTitle('Ir atrás');
        fireEvent.click(btn);
        expect(window.history.back).toHaveBeenCalledTimes(1);
    });
    it('matches the snapshot when iconOnly=false', () => {
        const { container } = render(
            <BackButton variant="link" iconOnly={false} />
        );
        expect(container).toMatchSnapshot();
    });

    it('matches the snapshot when iconOnly=true', () => {
        const { container } = render(
            <BackButton variant="secondary" iconOnly />
        );
        expect(container).toMatchSnapshot();
    });
});
