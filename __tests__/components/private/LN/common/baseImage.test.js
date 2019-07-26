import React from 'react';
import { render, mount } from 'enzyme';
import BaseImage from '../../../../../components/private/LN/common/baseImage';

describe('features - La Nacion - components - common - BaseImage', () => {
    const sources = [
        {
            media: '(min-width: 768px)',
            url: 'http://urldeprueba.com/imagenes/imagen1.jpeg',
            class: 'desktop',
            alt: 'texto 1'
        },
        {
            media: '(min-width: 360px)',
            url: 'http://urldeprueba.com/imagenes/imagen2.jpeg',
            class: 'desktop-sm',
            alt: 'texto 2'
        },
        {
            media: '(min-width: 240px)',
            url: 'http://urldeprueba.com/imagenes/imagen2.jpeg',
            class: 'mobile',
            alt: 'texto 3'
        }
    ];

    it('Test snapshot', () => {
        const comp = render(
            <BaseImage
                sources={sources}
                altText="texto alternativo"
                zoom
                href="http://www.lanacion.com.ar/unaNota"
            />
        );
        expect(comp).toMatchSnapshot();
    });

    it('Test sin link y sin zoom', () => {
        const comp = mount(
            <BaseImage sources={sources} altText="texto alternativo" />
        );
        expect(comp.find('a').length).toBe(0);
        expect(comp.find('.zoom').length).toBe(0);
    });
});
