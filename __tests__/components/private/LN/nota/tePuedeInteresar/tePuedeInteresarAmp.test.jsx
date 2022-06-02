import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { useContent } from 'fusion:content';
import Consumer from 'fusion:consumer';
import TePuedeInteresarAmp from '../../../../../../components/private/LN/nota/tePuedeInteresar/tePuedeInteresarAmp';
import articlesMock from '../../../../../../__mocks__/data/tePuedeInteresar/liftigniterResponse.json';
import Context from 'fusion:context';

Context.useAppContext = jest.fn(() => ({}));
useContent.mockImplementation(() => articlesMock);

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({})
    };
});

describe('TePuedeIneresarAmp', () => {
    const props = {
        cantidadNotas: 2,
        excludeItems: [
            'https://www.lanacion.com.ar/cultura/probando-showcase-nid06092021/?adstest=true&_website=la-nacion-ar&outputType=amp'
        ],
        outputType: 'amp',
        url:
            'https://www.lanacion.com.ar/cultura/probando-showcase-nid06092021/?adstest=true&_website=la-nacion-ar&outputType=amp',
        idArticle: 'KXBYVZCYQRBRLNFJEOULS7AN4A',
        dataLayerSection: 'n_te_puede_interesar'
    };

    const wrapper = mount(<TePuedeInteresarAmp {...props} />);
    it('Validate Props', () => {
        expect(wrapper.props().outputType).toEqual(props.outputType);
        expect(wrapper.props().cantidadNotas).toEqual(props.cantidadNotas);
        expect(wrapper.props().excludeItems).toEqual(props.excludeItems);
        expect(wrapper.props().url).toEqual(props.url);
        expect(wrapper.props().idArticle).toEqual(props.idArticle);
        expect(wrapper.props().dataLayerSection).toEqual(
            props.dataLayerSection
        );
    });

    it('Should render component', () => {
        expect(render(wrapper)).toMatchSnapshot();
    });
});
