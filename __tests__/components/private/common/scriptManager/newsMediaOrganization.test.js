import React from 'react';
import NewsMediaOrganization from '../../../../../components/private/common/scriptManager/newsMediaOrganization';
import { shallow } from 'enzyme';

describe('Private - Common - NewsMediaOrganization =>', () => {
    const shallowSelf = props => shallow(<NewsMediaOrganization {...props} />);
    const verifyHtml = (wrapper, output = '') =>
        expect(wrapper.html()).toEqual(output);

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
        const rawScript = `<script type="application/ld+json">{"@context":"http://schema.org","@type":"NewsMediaOrganization","name":"LA NACION","url":"https://www.lanacion.com.ar/","sameAs":["https://www.facebook.com/lanacion/","https://www.instagram.com/lanacioncom/","https://twitter.com/LANACION"]}</script>`;

        it('should returns null', () => {
            verifyHtml(wrapper, rawScript);
        });
    });
});
