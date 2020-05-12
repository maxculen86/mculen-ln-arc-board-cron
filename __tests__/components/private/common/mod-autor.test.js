import React from 'react';
import { mount, shallow, render } from 'enzyme';

import ModAutor from '../../../../components/private/common/mod-autor';

describe('ModAutor', () => {
    const props = {
        autor: [
            { name: 'Pepe', link: 'https://lanacion.com.ar' },
            { name: 'Paco', link: 'https://lanacion.com.ar' }
        ],
        foto: null,
        classCondition: '--autor',
        medio: null,
        amp: false
    };

    it('Matches snapshot', () => {
        const component = render(<ModAutor {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("Doesn't render image if there's no image", () => {
        const component = mount(<ModAutor {...props} />);
        expect(component.find('.container-img')).toHaveLength(0);
    });

    it("Doesn't render medio if there's no medio", () => {
        const component = mount(<ModAutor {...props} />);
        expect(component.find('.container-medio')).toHaveLength(0);
    });
});
