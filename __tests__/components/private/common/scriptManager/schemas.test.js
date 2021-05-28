import React from 'react';
import Schemas from '../../../../../components/private/common/scriptManager/schemas';
import { shallow } from 'enzyme';

describe('Private - Common - Schemas =>', () => {
    const shallowSelf = props => shallow(<Schemas {...props} />);
    const verifyHtml = (wrapper, output = '', finder = 'html') => {
        return expect(wrapper[finder]()).toEqual(output);
    };

    describe('with empty section or not home', () => {
        const wrappers = [
            shallowSelf(),
            shallowSelf({ section: 'nota' }),
            shallowSelf({ section: 'acumulado' })
        ];
        it('should returns null', () => {
            wrappers.map(x => verifyHtml(x));
        });
    });

    describe('with section equal to home', () => {
        const wrapper = shallowSelf({ section: 'home' });

        const scripts = [
            `{"@context":"http://schema.org","@type":"NewsMediaOrganization","name":"LA NACION","url":"https://www.lanacion.com.ar/","sameAs":["https://www.facebook.com/lanacion/","https://www.instagram.com/lanacioncom/","https://twitter.com/LANACION"]}`,
            `{"@context":"http://schema.org","@type":"WebSite","url":"https://www.lanacion.com.ar/"}`
        ];

        const nodes = scripts.map(x => (
            <script
                dangerouslySetInnerHTML={{ __html: x }}
                type="application/ld+json"
            ></script>
        ));
        it('should returns content', () => {
            verifyHtml(wrapper, nodes, 'getElements');
        });
    });
});
