import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import MainHeaderEventsScript from '../../../../../components/private/common/scriptManager/MainHeaderEventsScript';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('components - private - common - scriptManager - MainHeaderEventsScript', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            contextPath: '/path',
            deployment: jest.fn(path => `https://lanacion.com.ar${path}`)
        });
    });

    it('renders the script tag with the correct src attribute', () => {
        const { container } = render(<MainHeaderEventsScript />);

        const scriptTag = container.querySelector('#script-main-header-events');

        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag).toHaveAttribute(
            'src',
            'https://lanacion.com.ar/path/resources/js/LN/mainHeaderEventsScript.min.js'
        );
        expect(scriptTag).toHaveAttribute('defer');
    });
});
