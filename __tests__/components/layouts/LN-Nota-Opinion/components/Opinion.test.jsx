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
        promo_items: {},
        taxonomy: {
            primary_section: { _id: '/opinion' },
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

    it('renders ANÁLISIS label and author name when analysis tag exists and there is a single author', () => {
        setup({
            globalContent: {
                credits: {
                    by: [{ type: 'author', name: 'Carlitos Tevez' }]
                },
                taxonomy: {
                    primary_section: {
                        _id: '/opinion'
                    },
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
        expect(screen.getByText('CARLITOS TEVEZ')).toBeInTheDocument();
    });

    it('renders ANÁLISIS label and does not render authors when analysis tag exists and there are multiple authors', () => {
        setup({
            globalContent: {
                credits: {
                    by: [
                        { type: 'author', name: 'Carlitos Tevez' },
                        { type: 'author', name: 'Zakk Wylde' }
                    ]
                },
                taxonomy: {
                    primary_section: {
                        _id: '/opinion'
                    },
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
            screen.queryByText('CARLITOS TEVEZ Y ZAKK WYLDE')
        ).not.toBeInTheDocument();
    });

    it('renders OPINIÓN label and does not render authors when no analysis tag exists', () => {
        setup({
            globalContent: {
                taxonomy: {
                    primary_section: {
                        _id: '/opinion'
                    },
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

    it('renders EDITORIALES label and does not render authors when primary section is editoriales', () => {
        setup({
            globalContent: {
                taxonomy: {
                    primary_section: {
                        _id: '/editoriales'
                    },
                    tags: [
                        {
                            description: 'Política',
                            slug: 'politica-tid12345',
                            text: 'Política'
                        },
                        {
                            description: 'Análisis',
                            slug: 'analisis-tid63578',
                            text: 'Análisis'
                        }
                    ]
                }
            }
        });

        expect(screen.getByText('EDITORIALES')).toBeInTheDocument();
        expect(
            screen.queryByText('CARLITOS TEVEZ Y ZAKK WYLDE')
        ).not.toBeInTheDocument();
    });
});
