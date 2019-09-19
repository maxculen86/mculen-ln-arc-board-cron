import React from 'react';
import { render, mount } from 'enzyme';
import ImageBase from '../../../../../components/private/LN/common/media/imageBase/component';

describe('features - La Nacion - components - common - BaseImage', () => {
    const sources = [
        {
            resizedUrl: 'http://urldeprueba.com/imagenes/imagen1.jpeg',
            option: {
                media: '(min-width: 768px)',
                class: 'desktop',
                alt: 'texto 1'
            }
        },
        {
            resizedUrl: 'http://urldeprueba.com/imagenes/imagen2.jpeg',
            option: {
                media: '(min-width: 360px)',
                class: 'desktop-sm',
                alt: 'texto 2'
            }
        },
        {
            resizedUrl: 'http://urldeprueba.com/imagenes/imagen2.jpeg',
            option: {
                media: '(min-width: 240px)',
                class: 'mobile',
                alt: 'texto 3'
            }
        }
    ];

    it('Test snapshot', () => {
        const comp = render(
            <ImageBase
                sources={sources}
                altText="texto alternativo"
                zoom
                href="http://www.lanacion.com.ar/unaNota"
            />
        );
        expect(comp).toMatchSnapshot();
    });

    it('Test sin zoom', () => {
        const comp = mount(
            <ImageBase sources={sources} altText="texto alternativo" />
        );
        expect(comp.find('.zoom').length).toBe(0);
    });
});
