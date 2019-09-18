import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

function BannerCaja1(props) {
    const { siteProperties, isAdmin } = props;
    return (
        <Banner
            siteProperties={siteProperties}
            slotGroup="acumulado"
            selectedSlots={{
                desktopSlot: 'caja1_dsk',
                mobileSlot: 'caja1_mob',
                tabletSlot: 'caja1_tab'
            }}
            isAdmin={isAdmin}
            sticky={false}
            screenUtils={{
                device: 'desktop'
            }}
        />
    );
}

export default Consumer(BannerCaja1);
