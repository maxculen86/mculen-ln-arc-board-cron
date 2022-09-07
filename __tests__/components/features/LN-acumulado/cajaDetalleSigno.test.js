import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useContent } from 'fusion:content';
import Context from 'fusion:context';
import CajaDetalleSigno from '../../../../components/features/LN-acumulado/cajaDetalleSigno';
import API_RESPONSE_SIGN from '../../../../__mocks__/data/apiHoroscope/signoZodiaco';

jest.mock(
    '../../../../components/private/common/staticValidation',
    () => 'mock-static-validation'
);
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const deployment = deploymentValue => deploymentValue;
const props = {
    customFields: { title: 'Seleccioná tu signo...' },
    id: 'f0fTek5ovhrk51V'
};
const globalContent = {
    _id: '/horoscopo'
};

describe('Features - LN-acumulado - Caja Detalle Signo Feature =>', () => {
    describe('without data response nothing renders ', () => {
        it('Should return null', () => {
            useContent.mockImplementation(() => {});

            Context.useAppContext = jest.fn(() => ({
                globalContent
            }));

            const { container } = render(<CajaDetalleSigno {...props} />);

            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('With a valid response', () => {
        it('Should render CajaDetalleSigno component and child components', () => {
            useContent.mockImplementation(() => API_RESPONSE_SIGN);
            Context.useAppContext = jest.fn(() => ({
                globalContent,
                deployment
            }));
            const { container } = render(<CajaDetalleSigno {...props} />);
            const cajaDetalleSigno = container.getElementsByClassName(
                'daily-horoscope '
            );
            expect(
                screen.getByText(
                    (content, element) =>
                        element.tagName.toLowerCase() ===
                        'mock-static-validation'
                )
            ).toBeVisible();
            expect(container).toMatchSnapshot();
            expect(cajaDetalleSigno[0]).toBeVisible();
        });
    });
});
