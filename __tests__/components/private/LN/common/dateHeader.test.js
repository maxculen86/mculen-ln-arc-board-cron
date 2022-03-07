import React from 'react';
import { render } from 'enzyme';
import DateHeader from '../../../../../components/private/LN/common/dateHeader';

describe('features - LaNacion - Nota - DateHeader', () => {
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
    describe('With props', () => {
        const component = render(
            <DateHeader
                display_date={props.display_date}
                labelEdicionImpresa={props.label}
            />
        );

        it('Test de snapshot DateHeader', () => {
            expect(component).toMatchSnapshot();
        });

        it('Nota - Author - AuthorAndDate - DateHeader', () => {
            expect(component.text()).toEqual('12 de mayo de 2020 • 19:43');
        });
    });
    describe('Without props', () => {
        const component = render(<DateHeader />);

        it('Should return null', () => {
            expect(component.html()).toBeNull();
        });
    });
    describe('Test de edicion impresa', () => {
        props.label.edicion.text = 'Impresa';
        const component = render(
            <DateHeader
                display_date={props.display_date}
                labelEdicionImpresa={props.label}
            />
        );

        it('Should return only date', () => {
            expect(component.text()).toEqual('12 de mayo de 2020');
        });
    });
});
