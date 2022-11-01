import React from 'react';
import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import getProperties from 'fusion:properties';
import NotaApertura from '../../../../../../components/private/LN/acumulado/notaApertura';
import { render, screen } from '@testing-library/react';
import { collections } from '../../../../../../__mocks__/data/nota/apertura/collections.json';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));
jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

const globalContent = {
    _id: '/autos'
};

describe('components - private - LN - acumulado - NotaApertura', () => {
    let { container } = render(<NotaApertura />);

    it('Testeo que NO renderize un div con clase mod-opening', () => {
        expect(container.getElementsByClassName('mod-opening').length).toEqual(
            0
        );
    });

    it('should test loading eager and fetch priority high', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent
        }));
        render(
            <NotaApertura
                outputType="section"
                articlesInCollection={collections}
            />
        );
        const imgs = screen.getAllByRole('img');
        expect(imgs.length).toEqual(2);
        expect(imgs[0].getAttribute('loading')).toEqual('eager');
        expect(imgs[0].getAttribute('fetchPriority')).toEqual('high');
        expect(imgs[1].getAttribute('loading')).toEqual('lazy');
        expect(imgs[1].getAttribute('fetchPriority')).toEqual('low');
    });

    //Cuando haya un acumulado con deba renderizar mod-opening
    //component = shallow(<NotaApertura customFields={{ idCollection: '/recetas' }} />);
});
