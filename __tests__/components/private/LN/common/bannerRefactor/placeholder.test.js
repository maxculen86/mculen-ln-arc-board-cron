import React from 'react';
import { shallow } from 'enzyme';

import Placeholder from '../../../../../../components/private/LN/common/bannerRefactor/placeholder';

describe('Placeholder', () => {
    it('Matches snapshot', () => {
        const props = {
            slotName: 'sticky1_mob',
            targeting: {
                sitio: 'lanacion',
                seccion: 'nota'
            },
            dimensions: [[1, 1]]
        };

        const component = shallow(<Placeholder {...props} />);
        expect(component).toMatchSnapshot();
    });
});
