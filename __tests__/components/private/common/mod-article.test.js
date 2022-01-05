import Consumer from 'fusion:consumer';
import React from 'react';
import { mount, render } from 'enzyme';
import Context from 'fusion:context';
import ModArticle from '../../../../components/private/common/mod-article';
import article from '../../../../__mocks__/data/articles/articleAcum.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Private - Common - ModArticle', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' }
    }));

    const authors = ['Mariano Grondona'];

    const props = {
        artPosition: undefined,
        articleData: article,
        dataSection: '',
        classCondition: '',
        withMedia: true,
        link: 'http://google.com',
        titleTag: 'h1',
        titleSize: '--s',
        titleText: 'Este es el titulo',
        authors: authors,
        boxPosition: undefined,
        dateText: '2020-06-02T15:28:04.694Z',
        device: 'desktop',
        handleClick: undefined,
        dateSize: '',
        subheadText: 'Este es el subtitulo',
        videoBackground: undefined,
        subheadSize: '2xs',
        subheadTag: 'h3',
        outputType: 'default',
        label: 'chapita',
        layout: '',
        category: '',
        tags: [],
        hour: '',
        isPowa: true,
        isRenderAuthor: false,
        isRenderAuthorOpinion: false
    };

    it('Render OK', () => {
        const component = mount(<ModArticle {...props} />);
        expect(component).toBeDefined();
    });

    it('Validar props enviadas', () => {
        const component = mount(<ModArticle {...props} />);
        expect(component.props()).toEqual(props);
    });

    it('Atributos y nodo del DOM correcto', () => {
        const component = mount(<ModArticle {...props} />);
        expect(component.find('.mod-article')).toHaveLength(1);
        expect(component.find('.mod-description')).toHaveLength(1);
        expect(component.find('.com-subhead')).toHaveLength(1);
        expect(component.find('.mod-marquee')).toHaveLength(1);
        expect(component.find('.com-date')).toHaveLength(1);
        expect(component.find('.com-title').html()).toBe(
            '<h1 class="com-title --s"><a href="http://google.com" title="Este es el titulo" class="com-link">Este es el titulo</a></h1>'
        );
    });

    it('ModArticle - Snapshots', () => {
        const component = render(<ModArticle {...props} />);
        expect(component).toMatchSnapshot();
    });
});
