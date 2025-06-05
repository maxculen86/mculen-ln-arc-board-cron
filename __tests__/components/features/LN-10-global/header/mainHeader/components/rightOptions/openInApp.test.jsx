import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getTypeOfDevice } from '@ln/hooks';
import { OpenInApp } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/openInApp';
import { useAppContext } from 'fusion:context';
import { isAndroid } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/_helper';
import { isSubscribed } from '../../../../../../../../components/private/common/auth/helper/loginHelper';

jest.mock('@ln/hooks', () => ({
    getTypeOfDevice: jest.fn()
}));

jest.mock(
    '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/_helper',
    () => ({
        isAndroid: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        isSubscribed: jest.fn(),
        SUBSCRIBED_HELPER: {
            LN: 'ln'
        }
    })
);

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('OpenInApp Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getTypeOfDevice.mockReturnValue('mobile');
        isAndroid.mockReturnValue(true);
        isSubscribed.mockReturnValue(true);
        useAppContext.mockReturnValue({
            globalContent: {
                canonical_url: ''
            },
            layout: 'LN10-Home_Main'
        });
        window.dataLayer = [];
        delete window.location;
        window.location = { href: '' };
    });

    it('should not render when not mobile', () => {
        getTypeOfDevice.mockReturnValue('desktop');
        render(<OpenInApp />);
        expect(screen.queryByText('ABRIR EN APP')).not.toBeInTheDocument();
    });

    it('should not render when not subscribed', () => {
        isSubscribed.mockReturnValue(false);
        render(<OpenInApp />);
        expect(screen.queryByText('ABRIR EN APP')).not.toBeInTheDocument();
    });

    it('should not render when not android', () => {
        isAndroid.mockReturnValue(false);
        render(<OpenInApp />);
        expect(screen.queryByText('ABRIR EN APP')).not.toBeInTheDocument();
    });

    it('should render when mobile, android and subscribed', () => {
        render(<OpenInApp />);
        expect(screen.getByText('ABRIR EN APP')).toBeInTheDocument();
    });

    it('should handle click and redirect to app for home page', () => {
        render(<OpenInApp />);
        const button = screen.getByText('ABRIR EN APP');
        fireEvent.click(button);
        expect(window.dataLayer).toContainEqual({
            event: 'e_linkclick',
            dynamic_action: 'abrir_app',
            dynamic_category: 'header',
            dynamic_label: 'android'
        });
    });
});
