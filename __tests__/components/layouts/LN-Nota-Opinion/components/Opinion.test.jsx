import React from 'react';
import { useAppContext } from 'fusion:context';
import { render, screen } from '@testing-library/react';
import Opinion from '../../../../../components/layouts/LN-Nota-Opinion/components/Opinion';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:consumer', () => component => component);

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('Opinion', () => {
    it('renders children inside BaseLayout and main content', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                headlines: { basic: '' },
                subheadlines: { basic: '' },
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
                <div />
                <div />
                <div />
                <p>Opinion text </p>
                <div />
                <div />
            </Opinion>
        );

        expect(screen.getByText('Opinion text')).toBeInTheDocument();
    });
});
