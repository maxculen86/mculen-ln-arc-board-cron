import React from 'react';
import { render } from '@testing-library/react';
import Comscore from '../../../../../components/private/common/scriptManager/comscore';

describe('Comscore', () => {
    const config = { c1: '2', c2: '12312312' };

    it('Should return script and noscript tags', () => {
        const { container } = render(
            <Comscore config={config} location="head" />
        );
        expect(container).toMatchSnapshot();
    });

    it('Should return empty string when props is empty', () => {
        const { container } = render(<Comscore />);
        expect(container.innerHTML).toEqual('');
    });
});
