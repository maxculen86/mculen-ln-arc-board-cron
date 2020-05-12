import React from 'react';
import { render, mount } from 'enzyme';

import ModImage from '../../../../components/private/common/mod-image';

describe('ModImage', () => {
    const props = {
        link: 'https://lanacion.com.ar',
        target: '_self',
        src: 'http://lorempixel.com/400/200',
        alt: 'Random pic',
        amp: false
    };

    it('Matches snapshot', () => {
        const component = render(<ModImage {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Renders link', () => {
        const component = mount(<ModImage {...props} />);
        expect(component.find('a.com-link')).toHaveLength(1);
    });

    it('Renders image', () => {
        const component = mount(<ModImage {...props} />);
        expect(component.find('img')).toHaveLength(1);
    });
});
