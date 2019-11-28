import Consumer from 'fusion:consumer';
import React from 'react';

import { render, mount, shallow } from 'enzyme';

jest.mock(
    '../../../../../../components/private/LN/common/banner/bannerPlaceholder',
    () => 'placeholder-mock'
);
jest.mock(
    '../../../../../../components/private/LN/common/banner/component',
    () => 'component-mock'
);
jest.mock(
    '../../../../../../components/private/common/hocs/withScreenUtils',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

import Banner from '../../../../../../components/private/LN/common/banner';
import WithNavigation from '../../../../../../components/private/LN/common/hocs/WithNavigation';
import { slotsConfig } from '../../../../../../components/private/LN/common/banner/config';

describe('LN - Common - Banner - Index', () => {
    it('Test render en PB', () => {
        const comp = mount(
            <Banner
                siteProperties={{ bannerConfig: { dfp_id: 1234 } }}
                isAdmin={true}
                slotGroup="nota"
                selectedSlots={{
                    desktopSlot: 'caja1_dsk',
                    mobileSlot: 'sticky1_mob',
                    tabletSlot: 'cabezal_tab'
                }}
                screenUtils={{ device: 'desktop' }}
            />
        );

        const renderedComp = comp.find('placeholder-mock');
        expect(renderedComp.is('placeholder-mock')).toBe(true);
        expect(renderedComp.prop('slotName')).toBe(
            slotsConfig['nota']['caja1_dsk'].slotName
        );
        expect(renderedComp.prop('dimensions')).toBe(
            slotsConfig['nota']['caja1_dsk'].dimensions
        );
        expect(renderedComp.prop('targeting')).toBe(
            slotsConfig['nota']['caja1_dsk'].targeting
        );
    });

    it('Test render en cliente', () => {
        const comp = mount(
            <Banner
                siteProperties={{ bannerConfig: { dfp_id: 1234 } }}
                isAdmin={false}
                slotGroup="nota"
                selectedSlots={{
                    desktopSlot: 'caja1_dsk',
                    mobileSlot: 'sticky1_mob',
                    tabletSlot: 'cabezal_tab'
                }}
                sticky={true}
                background={true}
                screenUtils={{ device: 'mobile' }}
            />
        );

        const renderedComp = comp.find('component-mock');
        console.log(comp.debug());
        // expect(renderedComp).toEqual(expect.arrayContaining(renderedComp.is('component-mock')));
        /* expect(renderedComp.prop('slotName')).toBe(
            slotsConfig['nota']['sticky1_mob'].slotName
        ); */
        /* expect(renderedComp.prop('dimensions')).toBe(
            slotsConfig['nota']['sticky1_mob'].dimensions
        ); */
        /* expect(renderedComp.prop('targeting')).toBe(
            slotsConfig['nota']['sticky1_mob'].targeting
        ); */
        /* expect(renderedComp.prop('bidding')).toBe(
            slotsConfig['nota']['sticky1_mob'].bidding
        ); */
        /* expect(renderedComp.prop('sticky')).toBe(true);
        expect(renderedComp.prop('background')).toBe(true); */
    });

    it('Test no DfpId en PB', () => {
        const comp = mount(
            <Banner
                siteProperties={{ bannerConfig: {} }}
                isAdmin={true}
                slotGroup="nota"
                selectedSlots={{
                    desktopSlot: 'caja1_dsk',
                    mobileSlot: 'sticky1_mob',
                    tabletSlot: 'cabezal_tab'
                }}
                screenUtils={{ device: 'desktop' }}
            />
        );

        const renderedComp = comp.find('placeholder-mock');
        expect(renderedComp.is('placeholder-mock')).toBe(true);
        expect(renderedComp.prop('missDfpId')).toBe(true);
    });

    // TODO: verificar nodfip en cliente
    // it("Test no DfpId en client", () => {
    //     const comp = mount(<Banner siteProperties={
    //         { bannerConfig: { } }
    //     }
    //         isAdmin={false} slotGroup="nota" selectedSlots={
    //             {
    //                 desktopSlot: "caja1_dsk",
    //                 mobileSlot: "sticky1_mob",
    //                 tabletSlot: "cabezal_tab"
    //             }
    //         }
    //         screenUtils={{ device: 'desktop' }} />);

    //     expect(comp.get(0).type()).toBe(null);
    // });
});
