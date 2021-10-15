import React from 'react';
import { shallow, mount } from 'enzyme';
import MetasFBNews from '../../../../../components/private/common/metaTags/metasFBNews';

const shallowThis = props => shallow(<MetasFBNews {...props} />);

const checkNodeByEntries = ({ entries, el }) => {
    entries.map(({ props, result }) => {
        const wrapper = mount(<MetasFBNews nodeType="nota" {...props} />);
        expect(wrapper.find(el).props().content).toBe(result);
    });
};

describe('LN - Common - MetasFBNews', () => {
    it('MetasFBNews should returns null', () => {
        const entries = [
            { nodeType: 'acumulado', sections: [] },
            { nodeType: 'nota', sections: [] },
            {
                nodeType: 'home',
                sections: [
                    {
                        _id: '/opinion',
                        _id: '/opinion/columnistas'
                    }
                ]
            }
        ];

        entries.map(x => {
            const wrapper = shallowThis(x);
            expect(wrapper.html()).toEqual('');
        });
    });

    it('MetasFBNews should returns correct meta article:opinion', () => {
        const entries = [
            { props: { sections: [{ _id: '/opinion' }] }, result: 'true' },
            { props: { sections: [{ _id: '/deportes' }] }, result: 'false' },
            { props: { sections: [{ _id: '/propiedades' }] }, result: 'false' }
        ];

        checkNodeByEntries({ entries, el: "meta[property='article:opinion']" });
    });
});
