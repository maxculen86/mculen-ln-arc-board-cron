import React from 'react';
import { render, shallow } from 'enzyme';
import BannerComponent from '../../../../../../components/private/LN/common/banner/component';

describe('components - private - LN - common - banner - bannerComponent', () => {
    const bannerProps = {
        slotName: '1x1_dsk',
        targeting: {
            sitio: 'lanacion',
            seccion: 'acumulado'
        },
        dimensions: [[1, 1]],
        missDfpId: false,
        outputType: 'default'
    };
    const componentHtml = shallow(<BannerComponent {...bannerProps} />);
    it('Testeo que se dibuje banner como fondo', () => {
        expect(componentHtml.html().includes('banner')).toBe(true);
    });

    const component = render(<BannerComponent {...bannerProps} />);
    it('Test de snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});
