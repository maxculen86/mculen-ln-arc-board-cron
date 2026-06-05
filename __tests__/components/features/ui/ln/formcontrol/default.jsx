import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Formcontrol from '../../../../../../components/features/ui/ln/formControl/default';

jest.mock('@ln/ds-common-formcontrol', () => {
    const React = require('react');

    const MockFormcontrol = React.forwardRef(
        ({ children, className, ...props }, ref) => (
            <div
                ref={ref}
                data-testid="common-formcontrol"
                className={className}
                {...props}
            >
                {children}
            </div>
        )
    );

    MockFormcontrol.Input = props => (
        <input data-testid="formcontrol-input" {...props} />
    );

    MockFormcontrol.Adornment = props => (
        <div data-testid="formcontrol-adornment" {...props} />
    );

    MockFormcontrol.Label = props => (
        <label data-testid="formcontrol-label" {...props} />
    );

    return {
        Formcontrol: MockFormcontrol
    };
});

describe('Formcontrol wrapper', () => {
    it('render CommonFormcontrol', () => {
        render(
            <Formcontrol className="test-class" data-custom="123">
                <span>contenido</span>
            </Formcontrol>
        );

        const form = screen.getByTestId('common-formcontrol');

        expect(form).toBeInTheDocument();
        expect(form).toHaveClass('test-class');
        expect(form).toHaveAttribute('data-custom', '123');
        expect(screen.getByText('contenido')).toBeInTheDocument();
    });

    it('forwards correctly the ref', () => {
        const ref = createRef();

        render(<Formcontrol ref={ref}>test</Formcontrol>);

        expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('exposes Input, Adornment, and Label as static properties', () => {
        render(
            <Formcontrol>
                <Formcontrol.Label>Label</Formcontrol.Label>
                <Formcontrol.Input placeholder="input" />
                <Formcontrol.Adornment>Adorno</Formcontrol.Adornment>
            </Formcontrol>
        );

        expect(screen.getByTestId('formcontrol-label')).toBeInTheDocument();
        expect(screen.getByTestId('formcontrol-input')).toBeInTheDocument();
        expect(screen.getByTestId('formcontrol-adornment')).toBeInTheDocument();
    });
});
