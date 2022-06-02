import React from 'react';
import { mount, render } from 'enzyme';
import ModDescription from '../../../../components/private/common/mod-description';
import Context from 'fusion:context';

jest.mock(
    '../../../../components/private/common/com-title.jsx',
    () => 'com-title-mock'
);
jest.mock(
    '../../../../components/private/common/com-date.jsx',
    () => 'com-date-mock'
);
jest.mock(
    '../../../../components/private/common/text/index.jsx',
    () => 'text-mock'
);
jest.mock(
    '../../../../components/private/common/com-tag.jsx',
    () => 'com-tag-mock'
);

jest.mock(
    '../../../../components/private/common/badge/Badge.jsx',
    () => 'com-badge-mock'
);

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Private - Common - ModDescription', () => {
    const props = {
        link: 'http://google.com',
        titleTag: 'h1',
        titleSize: '--s',
        titleText: 'Este es el titulo',
        authors: ['Mariano Grondona'],
        subheadText: 'Este es el subtitulo',
        subheadSize: '',
        authorSize: '',
        subheadTag: '',
        dateText: '2020-06-02T15:28:04.694Z',
        label: { style: '', text: '' },
        lead: undefined,
        dateSize: '',
        marquesina: 'Por Carlos Pagni',
        category: { name: 'Comunidad', path: '/comunidad' },
        contentRestrictions: {
            content_code: 'comun'
        },
        tags: [
            { text: 'Educación', slug: 'educacion-123' },
            { text: 'Inclusión', slug: 'inclusion-123' },
            { text: 'Sociedad', slug: 'sociedad-123' }
        ],
        dataAuthors: undefined,
        categoryNote: ''
    };

    Context.useAppContext = jest.fn(() => ({
        layout: 'LN-Home_Main'
    }));

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
        expect(component.find('com-tag-mock')).toHaveLength(4);
        expect(component.find('com-date-mock')).toHaveLength(1);
        expect(component.find('com-badge-mock')).toBeDefined();
        expect(component.find('com-title-mock').html()).toContain(
            'http://google.com'
        );
    });

    it('ModDescription - Snapshots', () => {
        const component = render(<ModDescription {...props} />);
        expect(component).toMatchSnapshot();
    });
});
