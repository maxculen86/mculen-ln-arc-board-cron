jest.mock(
    '../../../../components/private/common/com-title.jsx',
    () => 'com-title-mock'
);
jest.mock(
    '../../../../components/private/common/com-date.jsx',
    () => 'com-date-mock'
);
jest.mock(
    '../../../../components/private/common/mod-bajada.jsx',
    () => 'mod-bajada-mock'
);
jest.mock(
    '../../../../components/private/common/mod-marquee.jsx',
    () => 'mod-marquee-mock'
);
jest.mock(
    '../../../../components/private/common/com-labelArticle.jsx',
    () => 'com-label-mock'
);
jest.mock(
    '../../../../components/private/common/com-tag.jsx',
    () => 'com-tag-mock'
);

import React from 'react';
import { mount, render } from 'enzyme';
import ComTitle from '../../../../components/private/common/com-title';
import ComDate from '../../../../components/private/common/com-date';
import ModBajada from '../../../../components/private/common/mod-bajada';
import ModMarquesina from '../../../../components/private/common/mod-marquee';
import ComLabel from '../../../../components/private/common/com-labelArticle';
import ComTag from '../../../../components/private/common/com-tag';
import ModDescription from '../../../../components/private/common/mod-description';
import article from '../../../../__mocks__/data/articles/articleAcum.json';

describe('Private - Common - ModDescription', () => {
    const props = {
        link: 'http://google.com',
        titleTag: 'h1',
        titleSize: '--s',
        titleText: 'Este es el titulo',
        authors: ['Mariano Grondona'],
        subheadText: 'Este es el subtitulo',
        subheadSize: '',
        subheadTag: '',
        dateText: '2020-06-02T15:28:04.694Z',
        dateSize: '',
        marquesina: 'Por Carlos Pagni',
        category: { name: 'Comunidad', path: '/comunidad' },
        tags: [
            { text: 'Educación', slug: 'educacion-123' },
            { text: 'Inclusión', slug: 'inclusion-123' },
            { text: 'Sociedad', slug: 'sociedad-123' }
        ]
    };

    it('Render OK', () => {
        const component = mount(<ModDescription {...props} />);
        expect(component).toBeDefined();
    });

    it('Validar props enviadas', () => {
        const component = mount(<ModDescription {...props} />);
        expect(component.props()).toEqual(props);
    });

    it('Atributos y nodo del DOM correcto', () => {
        const component = mount(<ModDescription {...props} />);
        expect(component.find('com-title-mock')).toHaveLength(1);
        expect(component.find('mod-bajada-mock')).toHaveLength(1);
        expect(component.find('mod-marquee-mock')).toHaveLength(1);
        expect(component.find('com-tag-mock')).toHaveLength(4);
        expect(component.find('com-date-mock')).toHaveLength(1);
        expect(component.find('com-title-mock').html()).toContain(
            'http://google.com'
        );
    });

    it('ModDescription - Snapshots', () => {
        const component = render(<ModDescription {...props} />);
        expect(component).toMatchSnapshot();
    });
});
