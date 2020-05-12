import React from 'react';
import { mount, shallow, render } from 'enzyme';

import ModFirma from '../../../../components/private/common/mod-firma';

describe('ModFirma', () => {
    const props = {
        autor: [
            { name: 'Pepe', link: 'https://lanacion.com.ar' },
            { name: 'Paco', link: 'https://lanacion.com.ar' }
        ],
        classCondition: '--autor'
    };

    it('Matches snapshot', () => {
        const component = render(<ModFirma {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Renders as many authors as given', () => {
        const component = mount(<ModFirma {...props} />);
        console.log(component.debug());
        expect(component.find('a.com-link')).toHaveLength(2);
    });
});
