import React from 'react';
import { mount } from 'enzyme';
import MetaTitle from '../../../../../components/private/common/metaTitle';

describe('LN - Common - MetaTitle', () => {
    it('MetaTitle nota snapshot', () => {
        const metaTitleBasic = mount(
            <MetaTitle
                arcSite="la-nacion-ar"
                subtype="1"
                metaTitleBasic="El Gobierno evalúa postular a una diplomática de carrera para la embajada en el Vaticano"
                siteProperties={{
                    longTitle:
                        'Últimas noticias de Argentina y el mundo - LA NACION',
                    title: 'LA NACION',
                    deportesTitle: 'Últimas noticias de Deportes - LA NACION',
                    ultimasNoticiasTitle: 'Últimas noticias - LA NACION'
                }}
            />
        );
        expect(metaTitleBasic).toMatchSnapshot();
    });
});
