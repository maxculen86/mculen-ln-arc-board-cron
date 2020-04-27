import React from 'react';
import { render, mount } from 'enzyme';

import ComLink from '../../../../components/private/common/com-link';

describe('ComLink', () => {
    const props = {
        link: 'https://lanacion.com.ar',
        textname: 'A link',
        target: '_self',
        classCondition: '--autor'
    };

    it('Matches snapshot', () => {
        const component = render(<ComLink {...props} />);
        expect(component).toMatchSnapshot();
    });

    it("Renders span tag when there's no link", () => {
        const props = {
            ...props,
            link: null
        };

        const component = mount(<ComLink {...props} />);
        expect(component.find('span.com-text')).toHaveLength(1);
    });
});
