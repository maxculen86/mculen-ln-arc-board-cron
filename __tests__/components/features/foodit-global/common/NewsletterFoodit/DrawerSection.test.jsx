import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import DrawerSections from '../../../../../../components/features/foodit-global/common/DrawerSections/foodit';

jest.mock('@ln/ds-common-drawer', () => {
    const React = require('react');
    const original = jest.requireActual('@ln/ds-common-drawer');

    // IMPORTANTE: mantenemos Drawer real pero reemplazamos Portal
    const Drawer = props => <div data-testid="drawer-root" {...props} />;
    Drawer.Portal = ({ children }) => <>{children}</>;
    Drawer.Overlay = ({ children, ...props }) => (
        <div data-testid="drawer-overlay" {...props}>
            {children}
        </div>
    );
    Drawer.Content = ({ children, ...props }) => (
        <div data-testid="drawer-content" {...props}>
            {children}
        </div>
    );
    Drawer.Body = ({ children, ...props }) => (
        <div data-testid="drawer-body" {...props}>
            {children}
        </div>
    );

    return {
        ...original,
        Drawer,
        useDrawerVisibility: () => ({ isOpen: true }),
        drawerManager: { show: jest.fn(), hide: jest.fn() }
    };
});

jest.mock(
    '../../../../../../components/features/foodit-global/common/bookmark/api/_helper',
    () => ({
        addToast: jest.fn(),
        TOAST: {
            SUCCESS: {
                VARIANT: 'success',
                TITLE: 'Success',
                MESSAGE: { SEND_NEWSLETTER: 'Newsletter enviado' }
            }
        }
    })
);

describe('DrawerSections', () => {
    it('renders correctly (snapshot)', async () => {
        const { container } = render(<DrawerSections />);
        const evento = new CustomEvent('newsletterSelected', {
            detail: { id: 243, title: 'Test Newsletter' }
        });

        fireEvent(window, evento);
        expect(container).toMatchSnapshot();
    });
});
