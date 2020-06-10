import Consumer from 'fusion:consumer';
import Context from 'fusion:context';

import React from 'react';
import { mount } from 'enzyme';
import Media from '../../../../components/private/LN/common/media';
import image from '../../../../__mocks__/data/images/OTTprogramImage.json';

describe('Private - LN - Common - Media', () => {
    

    it('Dibuja el tag loading lazy', () => {
        const comp = mount(
            <Media
                mediaData={image}
                withZoom={false}
                itsGallery={false}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );
        const img = comp.find('img');
        expect(img.is('img')).toBe(true);
        //expect(comp.find('img').length).toEqual(1);
        expect(img.prop('loading')).toBe('lazy');
    });

    it('No dibuja el tag loading lazy por ser Galeria', () => {
        const comp = mount(
            <Media
                mediaData={image}
                withZoom={false}
                itsGallery={true}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );
        const img = comp.find('img');
        expect(img.is('img')).toBe(true);
        expect(comp.prop('loading')).toBe(undefined);
    });

    it('No dibuja el tag loading lazy por tener zoom', () => {
        const comp = mount(
            <Media
                mediaData={image}
                withZoom={true}
                itsGallery={false}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );
        const img = comp.find('img');
        expect(img.is('img')).toBe(true);
        expect(comp.prop('loading')).toBe(undefined);
    });

   
});


