import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';

function BannerCaja1(props) {
    const { siteProperties, isAdmin } = props;
    return (
        <div className="banner --desktop --large">
            <Banner
                siteProperties={siteProperties}
                slotGroup="acumulado"
                selectedSlots={{
                    desktopSlot: 'caja1_dsk',
                    mobileSlot: 'NINGUNO',
                    tabletSlot: 'NINGUNO'
                }}
                isAdmin={isAdmin}
                sticky={false}
                background
                screenUtils={{
                    device: 'desktop'
                }}
            />
        </div>
    );
}

export default Consumer(BannerCaja1);
