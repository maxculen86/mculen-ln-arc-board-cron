import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LnRadio from '../../../../../components/features/LN-10/lnRadio/default';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});
describe('Features - LaNacion - 10 - Radio', () => {
    const defaultProps = {
        id: 'mockId'
    };
    it('should render texts and links', () => {
        render(<LnRadio id="mockId" />);
        const buttonLink = screen.getByText('Escuchá + música');

        expect(
            screen.getByText('El mundo necesita más música')
        ).toBeInTheDocument();
        expect(buttonLink).toBeInTheDocument();
        expect(buttonLink).toHaveAttribute(
            'href',
            'https://masmusica.lanacion.com.ar/'
        );
    });

    it('should match snapshot', () => {
        const { container } = render(<LnRadio id="mockId" {...defaultProps} />);

        expect(container).toMatchSnapshot();
    });
});
