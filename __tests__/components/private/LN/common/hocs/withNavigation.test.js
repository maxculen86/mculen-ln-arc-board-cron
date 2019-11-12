import Consumer from 'fusion:consumer';
import React from 'react';
import { shallow } from 'enzyme';
import WithNavigation from '../../../../../../components/private/LN/common/hocs/WithNavigation';

class TestComponent extends React.Component {
    render() {
        return <div></div>;
    }
}

describe('components - private - LN - common - hocs - withNavigation', () => {
    const sectionId = '/deportes';
    const ComponentWithNav = WithNavigation(
        <TestComponent sectionId={sectionId} website="la-nacion-ar" />
    );
    const component = shallow(
        <ComponentWithNav website="la-nacion-ar" sectionId={sectionId} />
    );
    console.log(component.props());
    it('Testeo que la propiedad pasada corresponda', () => {
        expect(component.prop('sectionId')).toBe(sectionId);
    });
});
