import React from 'react';
import { render, shallow } from 'enzyme';
import BannerPlaceholder from '../../../../../../components/private/LN/common/banner/bannerPlaceholder';

describe('components - private - LN - common - banner - bannerPlaceholder', () => {
    const bannerProps = {
        slotName: '1x1_dsk',
        targeting: {
            sitio: 'lanacion',
            seccion: 'acumulado'
        },
        dimensions: [[1, 1]],
        missDfpId: false
    };
    const componentHtml = shallow(<BannerPlaceholder {...bannerProps} />);
    it('Testeo que se dibuje lightgray como fondo', () => {
        expect(componentHtml.html().includes('lightgray')).toBe(true);
    });

    const component = render(<BannerPlaceholder {...bannerProps} />);
    it('Test de snapshot', () => {
        expect(component).toMatchSnapshot();
    });
});
