import React from 'react';
import MeteringAMP from '../../../../../components/private/common/scriptManager/meteringAMP';
import { shallow } from 'enzyme';

describe('Private - Common - MeteringAMP', () => {
    const globalContent = {
        canonicalUrl: '/espectaculos/luz-camara-accion-nid574',
        contentCode: 'comun',
        _id: 'BL4RTKROKZFUXKO5IJZ25PYG2I'
    };
    it('Should return a <amp-iframe></amp-iframe>', () => {
        const wrapper = shallow(
            <MeteringAMP
                canonicalUrl={globalContent.canonicalUrl}
                contentCode={globalContent.contentCode}
                _id={globalContent._id}
            />
        );
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Should return empty string when props is empty', () => {
        const wrapper = shallow(<MeteringAMP />);
        expect(wrapper.html()).toEqual('');
    });
});
