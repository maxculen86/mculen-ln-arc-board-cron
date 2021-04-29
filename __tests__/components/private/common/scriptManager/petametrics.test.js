import React from 'react';
import Petametrics from '../../../../../components/private/common/scriptManager/petametrics';
import { shallow } from 'enzyme';

describe('Private - Common - Petametrics =>', () => {
    describe('with empty location or type', () => {
        const wrapper1 = shallow(<Petametrics />);
        const wrapper2 = shallow(<Petametrics location="head" />);
        const wrapper3 = shallow(
            <Petametrics globalContent={{ type: 'story' }} />
        );

        it('should returns null', () => {
            expect(
                wrapper1.html() && wrapper2.html() && wrapper3.html()
            ).toEqual('');
        });
    });

    describe('with location and type', () => {
        const wrapper = shallow(
            <Petametrics globalContent={{ type: 'story' }} location="head" />
        );

        it('should returns null', () => {
            expect(wrapper.html()).toEqual(
                '<link href="https://cdn.petametrics.com" rel="preconnect"/>'
            );
        });
    });
});
