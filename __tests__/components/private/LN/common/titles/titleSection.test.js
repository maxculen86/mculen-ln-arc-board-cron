import React from 'react';
import { render, mount } from 'enzyme';
import TitleSection from '../../../../../../components/private/LN/common/titles/titleSection';

describe('TitleSection', () => {
    it('matches snapshot', () => {
        const component = render(<TitleSection size="m" text="Sample title" />);
        expect(component).toMatchSnapshot();
    });

    it('check correct class is displayed', () => {
        const component = mount(<TitleSection size="m" text="Sample title" />);
        expect(component.hasClass('com-title-section-m')).toEqual(true);
    });
});
