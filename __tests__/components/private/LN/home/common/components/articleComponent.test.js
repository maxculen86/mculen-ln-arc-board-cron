jest.mock('../../../../../../../components/private/LN/home/common/components/articleTitle',
() => 'mocked-title')

jest.mock('../../../../../../../components/private/LN/home/common/components/articleTag',
() => 'mocked-tag')

jest.mock('../../../../../../../components/private/LN/home/common/components/articleSubheader',
() => 'mocked-subheader')

import React from 'react';
import { mount } from 'enzyme';
import RegularArticleComponent from '../../../../../../../components/private/LN/home/common/components/article'
import TestHelper from '../../../../../../utils/testHelper'

describe('private - LN - home - common - components - article', () => {
    const imgUrls = [
        {
            name: 'desktop',
            url: 'http://resizer.shared.arcpublishing.com/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg'
        },
        {
            name: 'desktopSM',
            url: 'http://resizer.shared.arcpublishing.com/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg'
        },
        {
            name: 'tablet',
            url: 'http://resizer.shared.arcpublishing.com/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg'
        },
        {
            name: 'tabletSM',
            url: 'http://resizer.shared.arcpublishing.com/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg'
        },
        {
            name: 'mobile',
            url: 'http://resizer.shared.arcpublishing.com/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg'
        },
        {
            name: 'mobileSM',
            url: 'http://resizer.shared.arcpublishing.com/waT0eaOu9z7W7IYRMEMgR-ikEUI=/arc-anglerfish-arc2-sandbox-sandbox-lanacionar/public/YQPFIZTCKVFKFDHNINT7IBBI6U.jpg'
        }
    ]
    const a = {
        renderClasses: 'art-01 M',
        imgUrls: imgUrls,
        url: '/2018/09/20/tras-el-0-0-con-independiente-como-le-fue-a-river-en-la-era-marcelo-gallardo-cuando-tuvo-que-definir-una-serie-como-local/',
        teaser: 'Esto es una volanta',
        title: 'Esto es un title',
        tagName: 'prueba Tag',
        subheader: 'prueba bajada',
        classTag: ''
    }
    const child = <label>soy un child</label>
    const component = mount(<RegularArticleComponent { ...a }>{child}</RegularArticleComponent>)

    TestHelper.testDoNotRenderChildren(component, 'child')

    const titleComponent = component.find('mocked-title')

    it('Testeo que al subcomponente de titulo le llego volanta y titulo', () => {
        TestHelper.expectProp(titleComponent, 'teaser', a.teaser)
        TestHelper.expectProp(titleComponent, 'title', a.title)
    })

    const tagComponent = component.find('mocked-tag')

    it('Testeo que al subcomponente de tag le llego tagName y url', () => {
        TestHelper.expectProp(tagComponent, 'tagName', a.tagName)
        TestHelper.expectProp(tagComponent, 'url', a.url)
    })

    const subheaderComponent = component.find('mocked-subheader')

    it('Testeo que al subcomponente de bajada le llego la bajada', () => {
        TestHelper.expectProp(subheaderComponent, 'subheader', a.subheader)
    })
})