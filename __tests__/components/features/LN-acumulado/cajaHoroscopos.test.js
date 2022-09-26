import React from 'react';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import CajaHoroscopos from '../../../../components/features/LN-acumulado/cajaHoroscopos';
import API_RESPONSE_ZODIAC from '../../../../__mocks__/data/apiHoroscope/horoscoposZodiaco';

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

describe('Features - LN-acumulado - Caja Horoscopos Feature =>', () => {
    describe('without data response nothing renders ', () => {
        it('Should return null', () => {
            useContent.mockImplementation(() => {});

            Context.useAppContext = jest.fn(() => ({
                globalContent
            }));

            const { container } = render(<CajaHoroscopos {...props} />);

            expect(container.firstChild).toBeEmptyDOMElement();
        });
    });

    describe('With a valid response', () => {
        it('Render feature CajaHoroscopos and child components must be 12', () => {
            useContent.mockImplementation(() => API_RESPONSE_ZODIAC);
            Context.useAppContext = jest.fn(() => ({
                globalContent,
                deployment
            }));
            const { container } = render(<CajaHoroscopos {...props} />);
            const sings = container.getElementsByClassName(
                'horoscope-item --zodiaco'
            );
            expect(
                screen.getByText(
                    (content, element) =>
                        element.tagName.toLowerCase() ===
                        'mock-static-validation'
                )
            ).toBeVisible();
            expect(container).toMatchSnapshot();
            expect(sings.length).toBe(12);
        });
    });
});
