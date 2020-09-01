jest.mock(
    '../../../../../../components/private/LN/common/media/imageBase',
    () => 'mock-image'
);
jest.mock(
    '../../../../../../components/private/LN/common/media/videoPlayer.jsx',
    () => 'mock-video'
);

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {};

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';

import Consumer from 'fusion:consumer';
import React from 'react';

import Destacado from '../../../../../../components/private/LN/nota/apertura/destacado';
import { mount } from 'enzyme';
import nota from '../../../../../../__mocks__/data/articles/TWKFZQ6FCNF3ZKPHGGZPMSSOGQ';

describe('features - La Nacion - Components - Nota - Apertura - Destacado ', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' }
    }));

    it('Test de logica de Destacado - Imagen', () => {
        const comp = mount(<Destacado globalContent={nota} />);
        expect('image').toBe(nota.promo_items.basic.type);
    });

    it('Test de logica de Destacado - Video', () => {
        nota.promo_items.basic.type = 'video';
        const comp = mount(<Destacado globalContent={nota} />);
        expect('video').toBe(nota.promo_items.basic.type);
    });
});
