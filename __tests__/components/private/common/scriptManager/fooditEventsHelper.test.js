import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import FooditEventsHelper from '../../../../../components/private/common/scriptManager/FooditEventsHelper';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('components - private - common - scriptManager - FooditEventsHelper', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            contextPath: '/path',
            deployment: jest.fn(path => `https://lanacion.com.ar${path}`)
        });
    });

    it('renders the script tag with the correct src attribute', () => {
        const { container } = render(<FooditEventsHelper />);

        const scriptTag = container.querySelector('script');

        expect(scriptTag).toBeInTheDocument();

        expect(scriptTag).toHaveAttribute(
            'src',
            'https://lanacion.com.ar/path/resources/js/common/fooditEventsHelper.min.js'
        );
        expect(scriptTag).toHaveAttribute('defer');
        expect(scriptTag).toHaveAttribute('type', 'application/javascript');
    });
});
