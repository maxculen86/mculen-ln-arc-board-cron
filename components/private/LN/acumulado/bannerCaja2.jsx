import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

function BannerCaja2(props) {
    const { siteProperties, isAdmin } = props;
    return (
        <Banner
            extraClasses="--large"
            siteProperties={siteProperties}
            slotGroup="acumulado"
            selectedSlots={{
                desktopSlot: 'caja2_dsk',
                mobileSlot: 'caja2_mob',
                tabletSlot: 'caja2_tab'
            }}
            isAdmin={isAdmin}
            sticky={false}
            background
            screenUtils={{
                device: 'desktop'
            }}
        />
    );
}

export default Consumer(BannerCaja2);
