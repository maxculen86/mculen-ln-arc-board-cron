import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

function BannerSticky({ isAdmin, siteProperties }) {
    return (
        <Banner
            siteProperties={siteProperties}
            slotGroup="acumulado"
            selectedSlots={{
                mobileSlot: 'sticky2_mob'
            }}
            isAdmin={isAdmin}
            sticky
        />
    );
}

export default Consumer(BannerSticky);
