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
                <div /> {/* children[0] */}
                <div /> {/* children[1] */}
                <p>Opinion text</p> {/* children[2] → CUERPO */}
                <div /> {/* children[3] */}
                <div /> {/* children[4] */}
            </Opinion>
        );

        expect(screen.getByText('Opinion text')).toBeInTheDocument();
    });
});
