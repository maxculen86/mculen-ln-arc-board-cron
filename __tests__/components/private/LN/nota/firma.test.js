import React from 'react';
import { mount, shallow, render } from 'enzyme';

import Firma from '../../../../../components/private/LN/nota/firma';

describe('Firma', () => {
    const props = {
        authors: [
            { name: 'Pepe', link: 'https://lanacion.com.ar' },
            { name: 'Paco', link: 'https://lanacion.com.ar' }
        ],
        photo: null,
        medio: null,
        amp: false
    };

    it('Matches snapshot', () => {
        const component = render(<Firma {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Renders as many authors as given', () => {
        const component = mount(<Firma {...props} />);
        expect(component.find('a.com-link')).toHaveLength(2);
    });

    it('Renders photo and medium when one author is given', () => {
        const data = {
            authors: [{ name: 'Pepe', link: 'https://lanacion.com.ar' }],
            photo: 'http://lorempixel.com/400/200',
            medio: 'nacion',
            amp: false
        };

        const component = mount(<Firma {...data} />);

        expect(component.find('.container-img').length).toEqual(1);
        expect(component.find('.container-medio').length).toEqual(1);
    });
});
