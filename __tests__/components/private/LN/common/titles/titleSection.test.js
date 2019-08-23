import React from 'react';
import { render } from 'enzyme';
import TitleSection from '../../../../../../components/private/LN/common/titles/titleSection';

describe('TitleSection', () => {
    it('matches snapshot', () => {
        const component = render(<TitleSection size="m" text="Sample title" />);
        expect(component).toMatchSnapshot();
    });
});
