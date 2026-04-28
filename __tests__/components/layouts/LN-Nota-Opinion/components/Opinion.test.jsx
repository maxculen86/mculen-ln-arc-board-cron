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

const baseContext = {
    globalContent: {
        credits: {
            by: [
                { type: 'author', name: 'Carlitos Tevez' },
                { type: 'author', name: 'Zakk Wylde' }
            ]
        },
        headlines: { basic: '' },
        subheadlines: { basic: '' },
        taxonomy: {
            tags: [
                {
                    description: 'aceite de girasol',
                    slug: 'aceite-de-girasol-tid48354',
                    text: 'aceite de girasol'
                }
            ]
        }
    },
    siteProperties: {}
};

const setup = (contextOverride = {}) => {
    useAppContext.mockReturnValue({
        ...baseContext,
        ...contextOverride,
        globalContent: {
            ...baseContext.globalContent,
            ...contextOverride.globalContent
        }
    });

    return render(
        <Opinion>
            <div />
            <div />
            <div />
            <p>Opinion text </p>
            <div />
            <div />
            <div />
        </Opinion>
    );
};

describe('Opinion', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders children inside Layout and main content', () => {
        setup();

        expect(screen.getByText('Opinion text')).toBeInTheDocument();
    });

    it('renders ANÁLISIS label and authors when analysis tag exists', () => {
        setup({
            globalContent: {
                taxonomy: {
                    tags: [
                        {
                            description: 'Análisis',
                            slug: 'analisis-tid63578',
                            text: 'Análisis'
                        }
                    ]
                }
            }
        });

        expect(screen.getByText('ANÁLISIS')).toBeInTheDocument();
        expect(
            screen.getByText('CARLITOS TEVEZ Y ZAKK WYLDE')
        ).toBeInTheDocument();
    });

    it('renders OPINIÓN label and does not render authors when no analysis tag exists', () => {
        setup({
            globalContent: {
                taxonomy: {
                    tags: [
                        {
                            description: 'Malvinas',
                            slug: 'malvinas-tid46864',
                            text: 'Malvinas'
                        },
                        {
                            description: 'Medio ambiente',
                            slug: 'medio-ambiente',
                            text: 'Medio ambiente'
                        }
                    ]
                }
            }
        });

        expect(screen.getByText('OPINIÓN')).toBeInTheDocument();
        expect(
            screen.queryByText('CARLITOS TEVEZ Y ZAKK WYLDE')
        ).not.toBeInTheDocument();
    });
});
