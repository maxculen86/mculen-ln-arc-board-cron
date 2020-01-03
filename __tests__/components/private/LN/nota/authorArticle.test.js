import React from 'react';
import { render, mount } from 'enzyme';

import nota from '../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM';

import AuthorArticle from '../../../../../components/private/LN/nota/author/authorArticle';

describe('features - LaNacion - Nota - AuthorNota', () => {
    const component = render(<AuthorArticle globalContent={nota} />);
    it('Test de snapshot TituloNota', () => {
        expect(component).toMatchSnapshot();
    });

    it('displays accurately the number of authors', () => {
        const props = {
            globalContent: {
                credits: {
                    by: [
                        {
                            _id: '1',
                            name: 'Juan ',
                            type: 'author',
                            slug: 'juan-odd',
                            url: 'https://www.lanacion.com.ar'
                        },
                        {
                            _id: '2',
                            name: 'Maria ',
                            type: 'author',
                            slug: 'maria-odd',
                            url: ''
                        }
                    ]
                }
            }
        };
        const wrapper = mount(<AuthorArticle {...props} />);
        expect(wrapper.find('.com-author')).toHaveLength(2);
    });
});
