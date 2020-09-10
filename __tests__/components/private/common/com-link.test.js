import React from 'react';
import { render, mount, shallow } from 'enzyme';

import ComLink from '../../../../components/private/common/com-link';

describe('ComLink', () => {
    const props = {
        link: 'https://lanacion.com.ar',
        textname: 'A link',
        target: '_self',
        classCondition: '--autor'
    };

    const atributes = {
        className: 'com-link --autor',
        children: 'A link',
        href: 'https://lanacion.com.ar',
        rel: false,
        target: '_self',
        title: undefined
    };

    it('Render OK', () => {
        const component = shallow(<ComLink {...props} />);
        expect(component).toBeDefined();
        expect(component.isEmptyRender()).toBeFalsy();
        expect(component.find('a.com-link')).toBeTruthy();
        expect(component.find('a.com-link').html()).toContain('A link');
        expect(component.props()).toEqual(atributes);
    });

    it('Render OK tag when there is no link', () => {
        const props = {
            textname: 'A span',
            classCondition: '--autor'
        };

        const atributes = {
            className: 'com-text --autor',
            children: 'A span'
        };

        const component = shallow(<ComLink {...props} />);
        expect(component).toBeDefined();
        expect(component.isEmptyRender()).toBeFalsy();
        expect(component.find('span.com-text')).toBeTruthy();
        expect(component.props().className).toBe('com-text --autor');
        expect(component.props()).toEqual(atributes);
        expect(component.html()).toContain('A span');
    });

    it('Matches snapshot with link', () => {
        const props = {
            link: 'https://lanacion.com.ar',
            textname: 'A link',
            target: '_self',
            classCondition: '--autor'
        };
        const component = render(<ComLink {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Matches snapshot with link and children string html', () => {
        const props = {
            link: 'https://lanacion.com.ar',
            children: '<em>Hola</em>',
            target: '_self',
            classCondition: '--autor'
        };
        const component = render(<ComLink {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Matches snapshot without link', () => {
        const props = {
            children: 'A span',
            classCondition: '--autor'
        };
        const component = render(<ComLink {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('Matches snapshot without link  and children string html', () => {
        const props = {
            children: '<em>Hola</em>',
            classCondition: '--autor'
        };
        const component = render(<ComLink {...props} />);
        expect(component).toMatchSnapshot();
    });
});
