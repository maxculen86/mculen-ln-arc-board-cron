import React from 'react';
import { render, shallow } from 'enzyme';

import nota from '../../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM';

import AuthorAndDate from '../../../../../../components/private/LN/nota/author/authorAndDate';

describe('features - LaNacion - Nota - AuthorAndDate', () => {
    const component = render(<AuthorAndDate globalContent={nota} />);
    it('Test de snapshot AuthorAndDate', () => {
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
        const wrapper = shallow(<AuthorAndDate {...props} />);
        expect(wrapper.find('.mod-authordate')).toHaveLength(1);
    });
});
