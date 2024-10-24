import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import CajaFooditEventScript from '../../../../../components/private/common/scriptManager/scriptDataLayerCajaFoodit';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('components - private - common - scriptManager - CajaFooditEventScript', () => {
    it('should render the script tag with the correct src attribute and id', () => {
        useAppContext.mockReturnValue({
            contextPath: 'ln',
            deployment: path => `${path}`
        });

        const { container } = render(<CajaFooditEventScript />);

        const scriptTag = container.querySelector('script');
        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag.defer).toBe(true);
        expect(scriptTag.id).toBe('script-caja-foodit');
        expect(scriptTag.src).toBe(
            'http://localhost/ln/resources/js/LN/scriptDataLayerCajaFoodit.min.js'
        );
    });
});
