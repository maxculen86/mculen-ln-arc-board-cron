import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';
import WithScreenUtils from '../../common/hocs/withScreenUtils';

function BannerCabezal(props) {
    const { siteProperties, isAdmin, screenUtils } = props;
    const deviceClass = `--${screenUtils.device}`;
    return (
        <div className="banner w-100 --bg-banner">
            <div className={`banner --top ${deviceClass}`}>
                <Banner
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
        </div>
    );
}

export default WithScreenUtils(Consumer(BannerCabezal));
