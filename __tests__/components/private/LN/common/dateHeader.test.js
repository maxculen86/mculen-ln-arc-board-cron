import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DateHeader from '../../../../../components/private/LN/common/dateHeader';

const props = {
    display_date: '2020-05-13T01:43:50.136Z',
    label: {
        edicion: {
            url: '',
            text: 'Digital',
            display: true
        }
    }
};

describe('features - LaNacion - Nota - DateHeader', () => {
    describe('with props', () => {
        it('renders the formatted date and time', () => {
            render(
                <DateHeader
                    display_date={props.display_date}
                    labelEdicionImpresa={props.label}
                />
            );
            expect(
                screen.getByText('12 de mayo de 2020 • 19:43')
            ).toBeInTheDocument();
        });

        it('matches snapshot', () => {
            const { container } = render(
                <DateHeader
                    display_date={props.display_date}
                    labelEdicionImpresa={props.label}
                />
            );
            expect(container).toMatchSnapshot();
        });
    });

    describe('without props', () => {
        it('renders nothing', () => {
            const { container } = render(<DateHeader />);
            expect(container.firstChild).toBeNull();
        });
    });

    describe('with edicion impresa', () => {
        it('renders only the date without time', () => {
            const impresaLabel = {
                edicion: { ...props.label.edicion, text: 'Impresa' }
            };
            render(
                <DateHeader
                    display_date={props.display_date}
                    labelEdicionImpresa={impresaLabel}
                />
            );
            expect(screen.getByText('12 de mayo de 2020')).toBeInTheDocument();
        });
    });
});
