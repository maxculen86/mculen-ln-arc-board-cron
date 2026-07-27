import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import VwoScript from '../../../../../components/private/common/scriptManager/VwoScript';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('Private - Common - VwoScript', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            contextPath: '/context',
            deployment: path => `https://www.lanacion.com.ar${path}`
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('without head location', () => {
        it('renders nothing when location is not head', () => {
            const { container } = render(<VwoScript location="body-top" />);
            expect(container.firstChild).toBeNull();
        });

        it('renders nothing when location is body-bottom', () => {
            const { container } = render(<VwoScript location="body-bottom" />);
            expect(container.firstChild).toBeNull();
        });
    });

    describe('with location="head"', () => {
        it('renders a script tag with the VWO asset URL', () => {
            render(<VwoScript location="head" />);
            const script = document.querySelector('script');
            expect(script).toBeInTheDocument();
            expect(script.src).toBe(
                'https://www.lanacion.com.ar/context/resources/js/LN/vwoScript.min.js'
            );
        });

        it('renders the script with defer attribute', () => {
            render(<VwoScript location="head" />);
            const script = document.querySelector('script');
            expect(script).toHaveAttribute('defer');
        });
    });
});
