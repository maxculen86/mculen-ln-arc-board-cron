import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MarfeelMarkup from '../../../../../components/private/common/scriptManager/MarfeelMarkup';

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        contextPath: '/pf',
        deployment: jest.fn(),
        globalContent: {
            content_restrictions: {
                content_code: 'abierta'
            }
        }
    })
}));

describe('MarfeelMarkup', () => {
    describe('Renders script', () => {
        it('renders script with isAccessibleForFree as true', () => {
            const { container } = render(<MarfeelMarkup />);
            const scriptElement = container.querySelector(
                '#scriptMarfeelMarkup'
            );

            expect(scriptElement).toBeInTheDocument();
        });

        it('renders script with isAccessibleForFree as false', () => {
            jest.clearAllMocks();
            jest.mock('fusion:context', () => ({
                useAppContext: () => ({
                    contextPath: '/pf',
                    deployment: jest.fn(),
                    globalContent: {
                        content_restrictions: {
                            content_code: 'cerrada'
                        }
                    }
                })
            }));

            const { container } = render(<MarfeelMarkup />);
            const scriptElement = container.querySelector(
                '#scriptMarfeelMarkup'
            );

            expect(scriptElement).toBeInTheDocument();
        });
    });
    describe('Validates the property isAccessibleForFree of the note', () => {
        it('isAccessibleForFree should be true when content_code is "abierta"', () => {
            jest.clearAllMocks();
            jest.mock('fusion:context', () => ({
                useAppContext: () => ({
                    contextPath: '/pf',
                    deployment: jest.fn(),
                    globalContent: {
                        content_restrictions: {
                            content_code: 'abierta'
                        }
                    }
                })
            }));

            const { container } = render(<MarfeelMarkup />);
            const scriptElement = container.querySelector(
                '#scriptMarfeelMarkup'
            );

            expect(scriptElement).toBeInTheDocument();
            expect(
                JSON.parse(scriptElement.getAttribute('data-schema'))
                    .isAccessibleForFree
            ).toBe(true);
        });

        it('isAccessibleForFree should be true when content_code is "comun"', () => {
            jest.clearAllMocks();
            jest.mock('fusion:context', () => ({
                useAppContext: () => ({
                    contextPath: '/pf',
                    deployment: jest.fn(),
                    globalContent: {
                        content_restrictions: {
                            content_code: 'comun'
                        }
                    }
                })
            }));

            const { container } = render(<MarfeelMarkup />);
            const scriptElement = container.querySelector(
                '#scriptMarfeelMarkup'
            );

            expect(scriptElement).toBeInTheDocument();
            expect(
                JSON.parse(scriptElement.getAttribute('data-schema'))
                    .isAccessibleForFree
            ).toBe(true);
        });
    });
});
