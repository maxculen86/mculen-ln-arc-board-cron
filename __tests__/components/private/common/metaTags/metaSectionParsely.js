import React from 'react';
import { mount, shallow, render } from 'enzyme';
import MetaSectionParsely from '../../../../../components/private/common/metaSectionParsely';

const shallowThis = props => shallow(<MetaSectionParsely {...props} />);

describe('LN - Common - MetaSectionParsely', () => {
    it('MetaSectionParsely should returns Campo', () => {
        const wrapper = shallowThis({
            arcSite: 'la-nacion-ar',
            _id: '/economia/campo',
            taxonomy: ''
        });
        const wrapper1 = shallowThis({
            arcSite: 'la-nacion-ar',
            _id: '/economia/campo/agricultura',
            taxonomy: ''
        });

        const expectedValue = '<meta name="parsely-section" content="Campo"/>';

        expect(wrapper.html() && wrapper1.html()).toEqual(expectedValue);
    });

    it('MetaSectionParsely should returns Deportes', () => {
        const wrapper = shallowThis({
            arcSite: 'la-nacion-ar',
            _id: '/deportes/futbol/boca-juniors',
            taxonomy: ''
        });
        const expectedValue =
            '<meta name="parsely-section" content="Deportes"/>';

        expect(wrapper.html()).toEqual(expectedValue);
    });

    it('MetaSectionParsely with taxonomy should returns Propiedades', () => {
        const taxonomy = {
            primary_section: { _id: '/propiedades/inmuebles-comerciales' }
        };

        const wrapper = shallowThis({
            arcSite: 'la-nacion-ar',
            _id: '6WTWFSCNKBGHTPTZUBF7WOPC5M',
            taxonomy
        });
        const expectedValue =
            '<meta name="parsely-section" content="Propiedades"/>';

        expect(wrapper.html()).toEqual(expectedValue);
    });

    it('MetaSectionParsely should returns null', () => {
        const wrapper = shallowThis({
            _id: '6WTWFSCNKBGHTPTZUBF7WOPC5M',
            taxonomy: ''
        });
        const wrapper1 = shallowThis({ arcSite: 'la-nacion-ar', taxonomy: '' });
        const wrapper2 = shallowThis({ taxonomy: '' });
        const wrapper3 = shallowThis({});

        expect(
            wrapper.html() &&
                wrapper1.html() &&
                wrapper2.html() &&
                wrapper3.html()
        ).toEqual('');
    });
});
