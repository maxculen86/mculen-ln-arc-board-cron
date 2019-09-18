import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

function BannerCabezal(props) {
    const { siteProperties, isAdmin } = props;
    return (
        <Banner
            extraClasses="--top"
            siteProperties={siteProperties}
            slotGroup="acumulado"
            selectedSlots={{
                desktopSlot: 'cabezal_dsk',
                mobileSlot: 'cabezal_mob',
                tabletSlot: 'cabezal_tab'
            }}
            background
            isAdmin={isAdmin}
            sticky={false}
        />
    );
}

export default Consumer(BannerCabezal);
