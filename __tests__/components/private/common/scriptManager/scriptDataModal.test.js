import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import ScriptDataModal from '../../../../../components/private/common/scriptManager/scriptDataModal';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('components - private - common - scriptManager - ScriptDataModal', () => {
    it('should render the script tag with the correct src attribute', () => {
        useAppContext.mockReturnValue({
            contextPath: 'ln',
            deployment: path => `${path}`
        });

        const { container } = render(<ScriptDataModal />);

        const scriptTag = container.querySelector('script');
        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag.defer).toBe(true);
        expect(scriptTag.src).toBe(
            'http://localhost/ln/resources/js/LN/scriptDataModal.min.js'
        );
    });
});
