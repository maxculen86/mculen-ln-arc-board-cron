import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import generateIconPath from '../../../../../../components/features/ui/ln/icon/helpers';
import Accordion from '../../../../../../components/features/ui/ln/accordion/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../../components/features/ui/ln/icon/helpers', () =>
    jest.fn()
);

jest.mock('@ln/ds-common-accordion', () => {
    const React = require('react');

    const MockAccordion = ({ children, ...props }) => (
        <div data-testid="common-accordion" {...props}>
            {children}
        </div>
    );

    MockAccordion.Item = ({ children, ...props }) => (
        <div data-testid="accordion-item" {...props}>
            {children}
        </div>
    );

    MockAccordion.Header = ({ children, ...props }) => (
        <button data-testid="accordion-header" {...props}>
            {children}
        </button>
    );

    MockAccordion.Content = ({ children, ...props }) => (
        <div data-testid="accordion-content" {...props}>
            {children}
        </div>
    );

    MockAccordion.Icon = ({ path, ...props }) => (
        <img data-testid="accordion-icon" data-path={path} {...props} />
    );

    return {
        Accordion: MockAccordion
    };
});

describe('Accordion wrapper', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        useAppContext.mockReturnValue({
            contextPath: '/test-context',
            deployment: 'prod'
        });
    });

    it('render el CommonAccordion', () => {
        render(
            <Accordion data-custom="wrapper-prop">
                <span>Contenido</span>
            </Accordion>
        );

        const accordion = screen.getByTestId('common-accordion');

        expect(accordion).toBeInTheDocument();
        expect(accordion).toHaveAttribute('data-custom', 'wrapper-prop');
        expect(screen.getByText('Contenido')).toBeInTheDocument();
    });

    it('Item, Header y Content static props', () => {
        render(
            <Accordion>
                <Accordion.Item value="item-1">
                    <Accordion.Header>Header test</Accordion.Header>
                    <Accordion.Content>Content test</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        );

        expect(screen.getByTestId('accordion-item')).toBeInTheDocument();
        expect(screen.getByTestId('accordion-header')).toBeInTheDocument();
        expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
        expect(screen.getByText('Header test')).toBeInTheDocument();
        expect(screen.getByText('Content test')).toBeInTheDocument();
    });

    it('Accordion.Icon use the path received by props if it exists', () => {
        render(<Accordion.Icon path="/custom/icon.svg" alt="icon" />);

        const icon = screen.getByTestId('accordion-icon');

        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute('data-path', '/custom/icon.svg');
        expect(generateIconPath).not.toHaveBeenCalled();
    });

    it('Accordion.Icon generate path with generateIconPath if path does not exist', () => {
        generateIconPath.mockReturnValue('/generated/icon.svg');

        render(<Accordion.Icon type="filled" alt="icon" />);

        const icon = screen.getByTestId('accordion-icon');

        expect(generateIconPath).toHaveBeenCalledWith({
            contextPath: '/test-context',
            deployment: 'prod',
            type: 'filled'
        });

        expect(icon).toHaveAttribute('data-path', '/generated/icon.svg');
    });

    it('Accordion.Icon use type="default" default', () => {
        generateIconPath.mockReturnValue('/generated/default-icon.svg');

        render(<Accordion.Icon alt="icon" />);

        expect(generateIconPath).toHaveBeenCalledWith({
            contextPath: '/test-context',
            deployment: 'prod',
            type: 'default'
        });
    });

    it('Accordion.Icon props to CommonAccordion.Icon', () => {
        generateIconPath.mockReturnValue('/generated/icon.svg');

        render(<Accordion.Icon alt="mi icono" width="16" height="16" />);

        const icon = screen.getByTestId('accordion-icon');

        expect(icon).toHaveAttribute('alt', 'mi icono');
        expect(icon).toHaveAttribute('width', '16');
        expect(icon).toHaveAttribute('height', '16');
    });
});
