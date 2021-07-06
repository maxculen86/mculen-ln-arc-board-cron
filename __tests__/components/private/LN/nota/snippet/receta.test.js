import React from 'react';
import Context from 'fusion:context';
import { render, mount } from 'enzyme';
import Receta from '../../../../../../components/private/LN/nota/snippet/receta';
import getDomain from '../../../../../../components/private/common/utils/getDomain';
import article from '../../../../../../__mocks__/data/articles/ATLC5WVL4NH5HAHU2BWJXTSATY';
import toJson from 'enzyme-to-json';

jest.mock('fusion:content', () => ({
    useContent: () => ({
        _id: '/',
        _website: 'la-nacion-ar',
        name: 'LA NACION',
        site: {
            site_url:
                'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com/'
        },
        children: [
            {
                _id: '/recetas',
                site: {
                    site_url:
                        'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com/recetas/'
                },
                children: [
                    {
                        _id: '/recetas/carnes',
                        site: {
                            site_url: null
                        },
                        children: []
                    }
                ]
            }
        ]
    })
}));

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => (
            <Component {...props} deployment={() => {}} contextPath="" />
        );
    };
});

describe('SNIPPET - La Nacion - Nota - Receta ', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        globalContent: article
    };

    it('Test getDomain main site ', () => {
        const domain = getDomain({ _id: '/' });
        expect(domain).toBe('https://www.lanacion.com.ar');
    });

    it('Test getDomain child site ', () => {
        const domain = getDomain({ _id: '/recetas' });
        expect(domain).toBe('https://www.lanacion.com.ar');
    });

    it('Test getDomain child with website_url and no _id ', () => {
        const domain = getDomain({
            _id: '/NVDUCEERNZHWFH66AFKFLJEHOE',
            website_url:
                '/recetas/platos-de-comida-principal/risotto-con-alcauciles-y-frutos-de-mar-nid29102019-6/'
        });
        expect(domain).toBe('https://www.lanacion.com.ar');
    });

    it('Test Recipient Receta', () => {
        const comp = mount(<Receta {...props} />);

        expect(toJson(comp)).toMatchSnapshot();
    });
});
