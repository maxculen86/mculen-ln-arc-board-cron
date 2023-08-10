import React from 'react';
import '@testing-library/jest-dom';
import Context from 'fusion:context';
import LotteryMeanings from '../../../../../components/features/LN-services/lotteryMeanings/default';
import { render } from '@testing-library/react';

jest.mock(
    '../../../../../components/private/common/mod-headerSection.jsx',
    () => 'mock-mod-header-section'
);
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
const deployment = deploymentValue => deploymentValue;
describe('Features - LN-servicios - LN Loteria Significado de Números =>', () => {
    Context.useAppContext = jest.fn(() => ({
        contextPath: '/pf',
        deployment
    }));
    it('should return a list of topics about number meanings', () => {
        const { container } = render(<LotteryMeanings id="QWERTYUIOP" />);
        const list = container.getElementsByTagName('h2');
        expect(list.length).toBe(4);
    });
    it('snapshot test', () => {
        const { container } = render(<LotteryMeanings id="QWERTYUIOP" />);
        expect(container).toMatchSnapshot();
    });
});
