import React from 'react';
import { mount } from 'enzyme';
import Consumer from 'fusion:consumer';
import Article from '../../../../../../../components/private/LN/home/common/containers/article'

describe('private - LN - home - common - containers - article', () => {
    const cf = {
        id:'TWKFZQ6FCNF3ZKPHGGZPMSSOGQ', 
        url:'',
        teaser:'volanta de prueba',
        subheader:'',
        homeTitle:'titulo home',
        marquee:'marquesina',
        articleMark:'<Ninguna>',
        isExclusive:'false',
        size:'M',
        position:'1'
    }
    const component = mount(<Article {...cf} />)
    it('Testeo que dibuje las propiedaeds correctas', () => {
        expect(component.props()).toEqual(cf)
    })

})