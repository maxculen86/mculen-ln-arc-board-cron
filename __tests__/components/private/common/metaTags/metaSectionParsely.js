import React from 'react';
import { shallow } from 'enzyme';
import MetaSectionParsely from '../../../../../components/private/common/metaSectionParsely';

const shallowThis = props => shallow(<MetaSectionParsely {...props} />);

describe('LN - Common - MetaSectionParsely', () => {
    it('MetaSectionParsely should returns Campo', () => {
        const wrapper = shallowThis({
            arcSite: 'la-nacion-ar',
            taxonomy: { primary_section: { _id: '/economia/campo' } }
        });
        const wrapper1 = shallowThis({
            arcSite: 'la-nacion-ar',
            taxonomy: {
                primary_section: { _id: '/economia/campo/agricultura' }
            }
        });

        const expectedValue = '<meta name="parsely-section" content="Campo"/>';

        expect(wrapper.html() && wrapper1.html()).toEqual(expectedValue);
    });

    it('MetaSectionParsely should returns Deportes', () => {
        const wrapper = shallowThis({
            arcSite: 'la-nacion-ar',
            taxonomy: {
                primary_section: { _id: '/deportes/futbol/boca-juniors' }
            }
        });
        const expectedValue =
            '<meta name="parsely-section" content="Deportes"/>';

        expect(wrapper.html()).toEqual(expectedValue);
    });

    it('MetaSectionParsely should returns null', () => {
        const wrapper = shallowThis({
            taxonomy: {
                primary_section: { _id: '/deportes/futbol/boca-juniors' }
            }
        });
        const wrapper1 = shallowThis({ arcSite: 'la-nacion-ar' });
        const wrapper2 = shallowThis({});

        expect(wrapper.html() && wrapper1.html() && wrapper2.html()).toEqual(
            ''
        );
    });
});
