jest.mock(
    '../../../../../../components/private/LN/common/media/imageBase',
    () => 'mock-image'
);
jest.mock(
    '../../../../../../components/private/LN/common/media/videoPlayer.jsx',
    () => 'mock-video'
);

import Consumer from 'fusion:consumer';
import React from 'react';

import Destacado from '../../../../../../components/private/LN/nota/apertura/destacado';
import { mount } from 'enzyme';
import nota from '../../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

describe('features - La Nacion - Components - Nota - Apertura - Destacado ', () => {
    it('Test de logica de Destacado - Imagen', () => {
        const comp = mount(<Destacado globalContent={nota} />);

        const img = comp.find('mock-image');
        expect(img.length).toBe(1);
        expect(img.prop('image')).toBe(nota.promo_items.basic);
        expect(img.prop('zoom')).toBe(undefined);
    });

    it('Test de logica de Destacado - Video', () => {
        nota.promo_items.basic.type = 'video';
        const comp = mount(<Destacado globalContent={nota} />);
        const video = comp.find('mock-video');
        expect(video.length).toBe(1);
        expect(video.prop('videoId')).toBe(nota.promo_items.basic._id);
    });
});
