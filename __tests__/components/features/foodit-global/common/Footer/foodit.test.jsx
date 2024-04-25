import React from 'react';
import { render, screen } from '@testing-library/react';
import Context from 'fusion:context';
import FooterFoodit from '../../../../../../components/features/foodit-global/common/Footer/foodit';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = { outputType: 'amp' };

        return props.children(mockAvailableProps);
    }
}));
const deployment = (deploymentValue = 'lanacion.com.ar') => deploymentValue;
xdescribe('Components - Features - foodit-global - Common - FooterFoodit', () => {
    Context.useAppContext = jest.fn(() => ({
        contextPath: '/pf',
        deployment
    }));

    beforeEach(() => {
        render(<FooterFoodit />);
    });
    it('should contain eight links', () => {
        const { length } = screen.getAllByRole('link');
        expect(length).toEqual(8);
    });
    it('should contain five icons', () => {
        const { length } = document.querySelectorAll('.icon');
        expect(length).toEqual(5);
    });
    it('should match snapshot', () => {
        const { container } = render(<FooterFoodit />);
        expect(container).toMatchSnapshot();
    });
});
