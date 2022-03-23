import React from 'react';
import { render, shallow } from 'enzyme';

import Ordered from '../../../../../../components/private/LN/common/lists/ordered';

describe('features - LaNacion - Nota - ordered', () => {
    const component = render(
        <Ordered>
            <div>Soy el children</div>
            <p>Soy el p</p>
        </Ordered>
    );
    it('when the extraClass prop exists should have de className extra ', () => {
        const component = shallow(
            <Ordered extraClass="--modifier">
                <div>Soy el children</div>
                <p>Soy el p</p>
            </Ordered>
        );
        expect(component.props().className).toContain('--modifier');
    });
    it('when the extraClass prop is empty the ol tag only has the className "com-ordered"', () => {
        const component = shallow(
            <Ordered extraClass="">
                <div>Soy el children</div>
                <p>Soy el p</p>
            </Ordered>
        );
        expect(component.props().className).toBe('com-ordered');
    });
    it('Test de snapshot Ordered', () => {
        expect(component).toMatchSnapshot();
    });
});
