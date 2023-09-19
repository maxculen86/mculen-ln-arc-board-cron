import React from 'react';
import { render } from '@testing-library/react';
import CriticalCSS from '../../../../../../components/features/foodit-global/common/CriticalCss/foodit';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
describe('Recetas - CriticalCss', () => {
    const deployment = deploymentValue => deploymentValue;
    jest.fn(() => ({}));
    Context.useAppContext = jest.fn(() => ({
        deployment: deployment,
        contextPath: '/pf'
    }));
    it('Should match snapshot', () => {
        const { container } = render(<CriticalCSS />);
        expect(container).toMatchSnapshot();
    });
});
