import React from 'react';
import { render, mount } from 'enzyme';
import OembedAMP from '../../../../../../components/private/LN/nota/cuerpo/oembedAMP';

describe('OembedAMP', () => {
    const data = {
        _id: 'ENSIEQ77X5DZXN63BY2PGEKDAQ',
        raw_oembed: {
            height: null,
            html:
                '<div id="fb-root"></div>\n<script async="1" defer="1" crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v7.0"></script><div class="fb-post" data-href="https://www.facebook.com/zuck/posts/10102593740125791" data-width="552"><blockquote cite="https://www.facebook.com/zuck/posts/10102593740125791" class="fb-xfbml-parse-ignore"><p>February 4 is Facebook’s 12th birthday!\n\nOur anniversary has a lot of meaning to me as an opportunity to reflect on how...</p>Posted by <a href="https://www.facebook.com/zuck">Mark Zuckerberg</a> on&nbsp;<a href="https://www.facebook.com/zuck/posts/10102593740125791">Tuesday, January 12, 2016</a></blockquote></div>',
            type: 'facebook-post',
            url: 'https://www.facebook.com/zuck/posts/10102593740125791',
            width: 552
        },
        subtype: 'facebook-post',
        type: 'oembed_response'
    };

    let component;

    beforeEach(() => {
        component = mount(<OembedAMP data={data} />);
    });

    afterEach(() => {
        component = null;
    });

    it('Matches snapshot', () => {
        const oembedAMP = render(<OembedAMP data={data} />);
        expect(oembedAMP).toMatchSnapshot();
    });

    it('Props', () => {
        expect(component.props().data).toBe(data);
        expect(component.props().data.type).toBe('oembed_response');
    });
});
