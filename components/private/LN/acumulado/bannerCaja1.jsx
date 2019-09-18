import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

function BannerCaja1(props) {
    const { siteProperties, isAdmin } = props;
    return (
        <Banner
            extraClasses="--large"
            siteProperties={siteProperties}
            slotGroup="acumulado"
            selectedSlots={{
                desktopSlot: 'caja1_dsk',
                mobileSlot: 'caja1_mob',
                tabletSlot: 'caja1_tab'
            }}
            isAdmin={isAdmin}
            sticky={false}
            background
        />
    );
}

export default Consumer(BannerCaja1);
