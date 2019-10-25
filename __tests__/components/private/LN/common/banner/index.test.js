jest.mock(
    '../../../../../../components/private/LN/common/banner/bannerPlaceholder',
    () => 'mocked-bannerPlaceholder'
);

jest.mock(
    '../../../../../../components/private/LN/common/banner/component',
    () => 'mocked-bannerComponent'
);

import React from 'react';
import { mount } from 'enzyme';
import Banner from '../../../../../../components/private/LN/common/banner';

describe('components - private - LN - common - banner - index', () => {
    const props = {
        siteProperties: {
            bannerConfig: { dfp_id: 99999 }
        },
        slotGroup: 'acumulado',
        selectedSlots: {
            desktopSlot: 'cabezal_dsk',
            mobileSlot: 'sticky1_mob',
            tabletSlot: 'cabezal_tab'
        },
        sticky: false,
        background: true,
        extraClasses: '',
        screenUtils: {
            device: 'desktop'
        }
    };
    //Component con admin en true
    const componentAdmin = mount(<Banner {...props} isAdmin={true} />);
    const placeholder = componentAdmin.find('mocked-bannerPlaceholder');
    it('Chequeo que cuando es admin no muestre el component y muestre el placeholder', () => {
        expect(placeholder.length).toBe(1);
        expect(componentAdmin.find('mocked-bannerComponent').length).toBe(0);
    });

    //Component con admin en false
    const componentNoAdmin = mount(<Banner {...props} isAdmin={false} />);
    const bannerComponent = componentNoAdmin.find('mocked-bannerComponent');
    it('Chequeo que cuando no es admin muestre el component y no muestre el placeholder', () => {
        expect(componentNoAdmin.find('mocked-bannerPlaceholder').length).toBe(
            0
        );
        expect(bannerComponent.length).toBe(1);
    });

    it('chequeo que tome el desktop como slot', () => {
        expect(
            placeholder
                .prop('slotName')
                .includes(props.selectedSlots.desktopSlot)
        ).toBe(true);
        expect(
            bannerComponent
                .prop('slotName')
                .includes(props.selectedSlots.desktopSlot)
        ).toBe(true);
    });
});
