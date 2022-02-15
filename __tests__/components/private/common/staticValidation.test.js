import React from 'react';
import Context from 'fusion:context';
import { shallow } from 'enzyme';
import StaticValidation from '../../../../components/private/common/staticValidation';

jest.mock('fusion:static', () => 'mock-static');
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});
Context.useAppContext = jest.fn(() => ({
    outputType: 'default'
}));
const childMock = <p>Children mock</p>;
describe('components - private - common - StaticValidation', () => {
    describe('With props on default outputType', () => {
        const component = shallow(
            <StaticValidation id={'StaticMock'}>{childMock}</StaticValidation>
        );
        it('Should return static around children', () => {
            expect(component.find('mock-static')).toHaveLength(1);
            expect(component.containsMatchingElement(childMock)).toBeTruthy();
        });
    });
    describe('With props on default outputType - extra condition isStatic set to false', () => {
        const component = shallow(
            <StaticValidation id={'StaticMock'} isStatic={false}>
                {childMock}
            </StaticValidation>
        );
        it('Should NOT return static, only children', () => {
            expect(component.find('mock-static')).toHaveLength(0);
            expect(component.containsMatchingElement(childMock)).toBeTruthy();
        });
    });
    describe('With extra props htmlOnly and persistent', () => {
        const component = shallow(
            <StaticValidation
                id={'StaticMock'}
                isStatic={true}
                htmlOnly
                persistent
            >
                {childMock}
            </StaticValidation>
        );
        it('Should return static around children, with forwarded htmlOnly and persistent', () => {
            const staticComp = component.find('mock-static');
            expect(staticComp).toHaveLength(1);
            expect(staticComp.containsMatchingElement(childMock)).toBeTruthy();
            expect(staticComp.props('isStatic')).toBeTruthy();
            expect(staticComp.props('htmlOnly')).toBeTruthy();
            expect(staticComp.props('persistent')).toBeTruthy();
        });
    });
    describe('With props on AMP outputType', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'amp'
        }));
        const component = shallow(
            <StaticValidation id={'StaticMock'}>{childMock}</StaticValidation>
        );
        it('Should NOT return static around children', () => {
            expect(component.find('mock-static')).toHaveLength(0);
            expect(component.containsMatchingElement(childMock)).toBeTruthy();
        });
    });
    describe('Without props nor outputType', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: undefined
        }));
        const component = shallow(<StaticValidation />);

        it('Should return null', () => {
            expect(component.html()).toBeNull();
        });
    });
});
