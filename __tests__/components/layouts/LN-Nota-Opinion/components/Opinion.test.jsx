import React from 'react';
import { useAppContext } from 'fusion:context';
import { render, screen } from '@testing-library/react';
import Opinion from '../../../../../components/layouts/LN-Nota-Opinion/components/Opinion';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

describe('Opinion', () => {
    it('renders children inside BaseLayout and main content', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                headlines: { basic: '' },
                taxonomy: {
                    primary_section: { name: '', path: '' }
                }
            },
            siteProperties: {
                title: '',
                host: ''
            }
        });
        render(
            <Opinion>
                <p>Opinion text</p>
            </Opinion>
        );

        expect(screen.getByText('Opinion text')).toBeInTheDocument();
    });
});
