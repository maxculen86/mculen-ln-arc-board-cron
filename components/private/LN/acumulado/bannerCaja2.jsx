import React from 'react';
import Consumer from 'fusion:consumer';
import Banner from '../common/banner';
import WithScreenUtils from '../../common/hocs/withScreenUtils';

function BannerCaja2(props) {
    const { siteProperties, isAdmin, screenUtils } = props;
    const deviceClass = `--${screenUtils.device}`;
    return (
        <div className={`banner --large ${deviceClass}`}>
            <Banner
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
        </div>
    );
}

export default Consumer(WithScreenUtils(BannerCaja2));
