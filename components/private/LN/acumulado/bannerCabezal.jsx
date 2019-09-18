import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

function BannerCabezal(props) {
    const { siteProperties, isAdmin } = props;
    return (
        <div className="banner w-100 --bg-banner">
            <Banner
                extraClasses="--top"
                siteProperties={siteProperties}
                slotGroup="acumulado"
                selectedSlots={{
                    desktopSlot: 'cabezal_dsk',
                    mobileSlot: 'cabezal_mob',
                    tabletSlot: 'cabezal_tab'
                }}
                isAdmin={isAdmin}
                sticky={false}
            />
        </div>
    );
}

export default Consumer(BannerCabezal);
