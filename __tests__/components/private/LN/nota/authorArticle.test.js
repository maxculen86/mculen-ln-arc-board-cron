import React from 'react';
import { render, mount } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM';

import AuthorArticle from '../../../../../components/private/LN/nota/author/authorArticle';

describe('features - LaNacion - Nota - AuthorNota', () => {
    const component = render(<AuthorArticle globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });
    const props = {
        globalContent: {
            credits: {
                by: [
                    {
                        _id: '1',
                        name: 'Juan',
                        type: 'author',
                        slug: 'juan-odd',
                        url: 'https://www.lanacion.com.ar'
                    }
                ]
            }
        }
    };
    it('Displays accurately 1 author', () => {
        const wrapper = mount(<AuthorArticle {...props} />);
        expect(wrapper.find('authorArticle').text()).toBe('Por Juan');
        expect(wrapper.find('.com-author')).toHaveLength(0);
        expect(wrapper.find('span')).toHaveLength(2);
        expect(wrapper.find('a')).toHaveLength(1);
    });
    it('Displays accurately 2 authors', () => {
        props.globalContent.credits.by.push({
            _id: '2',
            name: 'Maria',
            type: 'author',
            slug: 'maria-odd',
            url: ''
        });
        const wrapper = mount(<AuthorArticle {...props} />);
        expect(wrapper.find('authorArticle').text()).toBe('Por Juan y Maria');
        expect(wrapper.find('.com-author')).toHaveLength(0);
        expect(wrapper.find('span')).toHaveLength(4);
        expect(wrapper.find('a')).toHaveLength(1);
    });
    it('Displays accurately 3 authors', () => {
        props.globalContent.credits.by.push({
            _id: '2',
            name: 'Pepe',
            type: 'author',
            slug: 'pepe-odd',
            url: 'https://www.lanacion.com.ar'
        });
        const wrapper = mount(<AuthorArticle {...props} />);
        expect(wrapper.find('authorArticle').text()).toBe(
            'Por Juan, Maria y Pepe'
        );
        expect(wrapper.find('.com-author')).toHaveLength(0);
        expect(wrapper.find('span')).toHaveLength(5);
        expect(wrapper.find('a')).toHaveLength(2);
    });
    it('Returns null without by array of authors', () => {
        const props = {
            globalContent: {
                credits: {}
            }
        };
        const wrapper = mount(<AuthorArticle {...props} />);
        expect(wrapper.html()).toBeNull();
    });
    it('Returns empty string with empty array of authors', () => {
        const props = {
            globalContent: {
                credits: {
                    by: []
                }
            }
        };
        const wrapper = mount(<AuthorArticle {...props} />);
        expect(wrapper.html()).toBe('');
    });
});
